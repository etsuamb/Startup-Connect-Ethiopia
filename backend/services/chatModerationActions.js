const pool = require("../config/db");
const chatModerationService = require("./chatModerationService");

/**
 * Log violation, track repeat offenders, notify admins when threshold exceeded.
 */
async function recordViolation({
	senderUserId,
	conversationId,
	attemptedMessage,
	flaggedReason,
	channel = "investor",
}) {
	const warning = chatModerationService.getWarningMessage();
	const threshold = chatModerationService.getViolationThreshold();
	const windowHours = chatModerationService.getViolationWindowHours();

	const logTable =
		channel === "mentor" ? "mentor_chat_moderation_logs" : "chat_moderation_logs";
	const convColumn =
		channel === "mentor" ? "mentor_conversation_id" : "conversation_id";

	const logIns = await pool.query(
		`INSERT INTO ${logTable} (sender_user_id, ${convColumn}, attempted_message, flagged_reason, chat_channel)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING log_id`,
		[senderUserId, conversationId, attemptedMessage, flaggedReason, channel],
	);
	const logId = logIns.rows[0]?.log_id;

	const viol = await pool.query(
		`INSERT INTO chat_user_violations (user_id, violation_count, last_violation_at)
     VALUES ($1, 1, CURRENT_TIMESTAMP)
     ON CONFLICT (user_id) DO UPDATE SET
       violation_count = chat_user_violations.violation_count + 1,
       last_violation_at = CURRENT_TIMESTAMP,
       updated_at = CURRENT_TIMESTAMP
     RETURNING violation_count, admin_warned_at`,
		[senderUserId],
	);

	const countInWindow = await pool.query(
		`SELECT COUNT(*)::int AS c FROM (
       SELECT log_id FROM chat_moderation_logs
       WHERE sender_user_id = $1 AND created_at > NOW() - make_interval(hours => $2::int)
       UNION ALL
       SELECT log_id FROM mentor_chat_moderation_logs
       WHERE sender_user_id = $1 AND created_at > NOW() - make_interval(hours => $2::int)
     ) v`,
		[senderUserId, windowHours],
	);
	const recentCount = countInWindow.rows[0]?.c ?? 0;

	let adminNotified = false;
	if (recentCount >= threshold) {
		adminNotified = await notifyAdminsRepeatViolation({
			senderUserId,
			recentCount,
			logId,
			channel,
		});
		if (channel === "investor" && logId) {
			await pool.query(
				`UPDATE chat_moderation_logs SET admin_notified = TRUE WHERE log_id = $1`,
				[logId],
			);
		}
	}

	return {
		blocked: true,
		warning,
		code: "MODERATION_BLOCKED",
		logId,
		recentViolations: recentCount,
		adminNotified,
	};
}

async function notifyAdminsRepeatViolation({ senderUserId, recentCount, logId, channel }) {
	const userR = await pool.query(
		`SELECT user_id, first_name, last_name, email, role FROM users WHERE user_id = $1`,
		[senderUserId],
	);
	const u = userR.rows[0];
	const label = u
		? `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.email
		: `User #${senderUserId}`;

	const admins = await pool.query(
		`SELECT user_id FROM users WHERE role = 'Admin' AND is_active = TRUE`,
	);

	const title = "Chat policy violation — repeat offender";
	const message = `${label} (${u?.role || "user"}) attempted to share restricted contact info ${recentCount} time(s) in ${chatModerationService.getViolationWindowHours()}h (${channel} chat). Review moderation logs.`;

	for (const admin of admins.rows) {
		await pool.query(
			`INSERT INTO notifications (user_id, notification_type, title, message, reference_type, reference_id)
       VALUES ($1, 'moderation', $2, $3, 'chat_moderation', $4)`,
			[admin.user_id, title, message, logId || senderUserId],
		);
	}

	await pool.query(
		`UPDATE chat_user_violations SET admin_warned_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1 AND admin_warned_at IS NULL`,
		[senderUserId],
	);

	return true;
}

module.exports = { recordViolation, notifyAdminsRepeatViolation };
