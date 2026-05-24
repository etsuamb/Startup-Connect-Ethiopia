const pool = require("../config/db");

/** GET /api/admin/chat-moderation/logs */
exports.listModerationLogs = async (req, res) => {
	try {
		const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
		const offset = Math.max(0, Number(req.query.offset) || 0);
		const userId = req.query.user_id ? Number(req.query.user_id) : null;
		const channel = req.query.channel;

		const params = [limit, offset];
		let userFilterInvestor = "";
		let userFilterMentor = "";
		if (userId) {
			params.push(userId);
			userFilterInvestor = ` AND l.sender_user_id = $${params.length}`;
			userFilterMentor = userFilterInvestor;
		}

		const investorLogs = await pool.query(
			`SELECT l.log_id, l.sender_user_id, l.conversation_id, l.attempted_message, l.flagged_reason,
              l.chat_channel, l.admin_notified, l.created_at,
              u.first_name, u.last_name, u.email, u.role,
              'investor' AS channel
       FROM chat_moderation_logs l
       INNER JOIN users u ON u.user_id = l.sender_user_id
       WHERE 1=1 ${userFilterInvestor}
       ORDER BY l.created_at DESC
       LIMIT $1 OFFSET $2`,
			params,
		);

		const mentorParams = [limit, offset];
		let mentorUserFilter = "";
		if (userId) {
			mentorParams.push(userId);
			mentorUserFilter = ` AND l.sender_user_id = $${mentorParams.length}`;
		}

		const mentorLogs = await pool.query(
			`SELECT l.log_id, l.sender_user_id, l.mentor_conversation_id AS conversation_id,
              l.attempted_message, l.flagged_reason, l.chat_channel, FALSE AS admin_notified, l.created_at,
              u.first_name, u.last_name, u.email, u.role,
              'mentor' AS channel
       FROM mentor_chat_moderation_logs l
       INNER JOIN users u ON u.user_id = l.sender_user_id
       WHERE 1=1 ${mentorUserFilter}
       ORDER BY l.created_at DESC
       LIMIT $1 OFFSET $2`,
			mentorParams,
		);

		let logs = [...investorLogs.rows, ...mentorLogs.rows];
		if (channel === "investor") logs = investorLogs.rows;
		else if (channel === "mentor") logs = mentorLogs.rows;
		else logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

		return res.json({ logs: logs.slice(0, limit), limit, offset });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** GET /api/admin/chat-moderation/violations */
exports.listUserViolations = async (req, res) => {
	try {
		const r = await pool.query(
			`SELECT v.*, u.first_name, u.last_name, u.email, u.role,
              (SELECT COUNT(*)::int FROM chat_moderation_logs WHERE sender_user_id = v.user_id) AS investor_log_count,
              (SELECT COUNT(*)::int FROM mentor_chat_moderation_logs WHERE sender_user_id = v.user_id) AS mentor_log_count
       FROM chat_user_violations v
       INNER JOIN users u ON u.user_id = v.user_id
       ORDER BY v.violation_count DESC, v.last_violation_at DESC NULLS LAST
       LIMIT 100`,
		);
		return res.json({ violations: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** GET /api/admin/chat-moderation/stats */
exports.getModerationStats = async (req, res) => {
	try {
		const windowHours = Number(req.query.hours) || 24;
		const stats = await pool.query(
			`SELECT
         (SELECT COUNT(*)::int FROM chat_moderation_logs WHERE created_at > NOW() - make_interval(hours => $1::int)) AS investor_flags_24h,
         (SELECT COUNT(*)::int FROM mentor_chat_moderation_logs WHERE created_at > NOW() - make_interval(hours => $1::int)) AS mentor_flags_24h,
         (SELECT COUNT(*)::int FROM chat_user_violations WHERE violation_count >= 3) AS repeat_offenders,
         (SELECT COUNT(*)::int FROM chat_user_violations WHERE is_chat_suspended = TRUE) AS suspended_users`,
			[windowHours],
		);
		return res.json({ stats: stats.rows[0], window_hours: windowHours });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** POST /api/admin/chat-moderation/users/:userId/suspend */
exports.suspendUserChat = async (req, res) => {
	try {
		const targetUserId = Number(req.params.userId);
		const adminId = req.user.user_id;
		const hours = Number(req.body?.hours) || 72;
		const notes = typeof req.body?.notes === "string" ? req.body.notes : null;

		await pool.query(
			`INSERT INTO chat_user_violations (user_id, is_chat_suspended, suspended_until, updated_at)
       VALUES ($1, TRUE, CURRENT_TIMESTAMP + make_interval(hours => $2::int), CURRENT_TIMESTAMP)
       ON CONFLICT (user_id) DO UPDATE SET
         is_chat_suspended = TRUE,
         suspended_until = CURRENT_TIMESTAMP + make_interval(hours => $2::int),
         updated_at = CURRENT_TIMESTAMP`,
			[targetUserId, hours],
		);

		await pool.query(
			`INSERT INTO chat_moderation_actions (admin_user_id, target_user_id, action_type, notes)
       VALUES ($1, $2, 'suspend_chat', $3)`,
			[adminId, targetUserId, notes],
		);

		return res.json({
			message: `Chat suspended for ${hours} hours`,
			user_id: targetUserId,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** POST /api/admin/chat-moderation/users/:userId/unsuspend */
exports.unsuspendUserChat = async (req, res) => {
	try {
		const targetUserId = Number(req.params.userId);
		const adminId = req.user.user_id;

		await pool.query(
			`UPDATE chat_user_violations SET is_chat_suspended = FALSE, suspended_until = NULL, updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $1`,
			[targetUserId],
		);

		await pool.query(
			`INSERT INTO chat_moderation_actions (admin_user_id, target_user_id, action_type, notes)
       VALUES ($1, $2, 'unsuspend_chat', $3)`,
			[adminId, targetUserId, req.body?.notes || null],
		);

		return res.json({ message: "Chat suspension lifted", user_id: targetUserId });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** POST /api/admin/chat-moderation/users/:userId/warn */
exports.warnUser = async (req, res) => {
	try {
		const targetUserId = Number(req.params.userId);
		const adminId = req.user.user_id;
		const message =
			req.body?.message ||
			"An administrator has reviewed your chat activity. Sharing contact information outside StartupConnect is prohibited.";

		await pool.query(
			`INSERT INTO notifications (user_id, notification_type, title, message, reference_type, reference_id)
       VALUES ($1, 'moderation', 'Chat policy warning', $2, 'chat_moderation', $3)`,
			[targetUserId, message, adminId],
		);

		await pool.query(
			`INSERT INTO chat_moderation_actions (admin_user_id, target_user_id, action_type, notes)
       VALUES ($1, $2, 'warn', $3)`,
			[adminId, targetUserId, message],
		);

		return res.json({ message: "Warning sent", user_id: targetUserId });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
