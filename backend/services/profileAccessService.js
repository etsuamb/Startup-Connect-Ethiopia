const pool = require("../config/db");
const chatAccessService = require("./chatAccessService");

/**
 * Sensitive contact unlock requires:
 * 1) Both users admin-verified and active
 * 2) At least one trusted relationship (funding, mentorship, payment, collaboration)
 */
async function getProfileContext(userId) {
	if (!userId) return null;
	const r = await pool.query(
		`SELECT u.user_id, u.role, u.is_approved, u.is_active,
            s.startup_id, i.investor_id, m.mentor_id
     FROM users u
     LEFT JOIN startups s ON s.user_id = u.user_id
     LEFT JOIN investors i ON i.user_id = u.user_id
     LEFT JOIN mentors m ON m.user_id = u.user_id
     WHERE u.user_id = $1`,
		[userId],
	);
	return r.rows[0] || null;
}

async function hasCompletedPaymentBetween(userIdA, userIdB) {
	if (!userIdA || !userIdB || Number(userIdA) === Number(userIdB)) return false;
	const r = await pool.query(
		`SELECT 1 FROM payments
     WHERE status = 'completed'
       AND (
         (from_user_id = $1 AND to_user_id = $2)
         OR (from_user_id = $2 AND to_user_id = $1)
       )
     LIMIT 1`,
		[userIdA, userIdB],
	);
	return r.rowCount > 0;
}

async function hasRelationshipUnlock(viewer, target) {
	if (!viewer || !target) return { unlocked: false, reason: null };

	const vUid = Number(viewer.user_id);
	const tUid = Number(target.user_id);

	if (vUid === tUid) return { unlocked: true, reason: "self" };
	if (viewer.role === "Admin") return { unlocked: true, reason: "admin" };

	if (await hasCompletedPaymentBetween(vUid, tUid)) {
		return { unlocked: true, reason: "payment_completed" };
	}

	// Startup ↔ Investor
	if (viewer.startup_id && target.investor_id) {
		if (await chatAccessService.hasInvestorChatUnlock(viewer.startup_id, target.investor_id)) {
			return { unlocked: true, reason: "funding_accepted" };
		}
	}
	if (viewer.investor_id && target.startup_id) {
		if (await chatAccessService.hasInvestorChatUnlock(target.startup_id, viewer.investor_id)) {
			return { unlocked: true, reason: "funding_accepted" };
		}
	}

	// Startup ↔ Mentor
	if (viewer.startup_id && target.mentor_id) {
		if (await chatAccessService.hasMentorChatUnlock(viewer.startup_id, target.mentor_id)) {
			return { unlocked: true, reason: "mentorship_accepted" };
		}
	}
	if (viewer.mentor_id && target.startup_id) {
		if (await chatAccessService.hasMentorChatUnlock(target.startup_id, viewer.mentor_id)) {
			return { unlocked: true, reason: "mentorship_accepted" };
		}
	}

	// Startup ↔ Startup (collaboration)
	if (viewer.startup_id && target.startup_id) {
		if (await chatAccessService.hasCollaborationUnlock(viewer.startup_id, target.startup_id)) {
			return { unlocked: true, reason: "collaboration_approved" };
		}
	}

	return { unlocked: false, reason: null };
}

/**
 * Evaluate whether viewer may see target user's sensitive contact fields.
 */
async function evaluateSensitiveAccess(viewerUserId, targetUserId, { endpoint = null } = {}) {
	if (!viewerUserId || !targetUserId) {
		return {
			sensitiveVisible: false,
			reason: "invalid_users",
			privacy: buildPrivacyMeta(false, "invalid_users"),
		};
	}

	if (Number(viewerUserId) === Number(targetUserId)) {
		return {
			sensitiveVisible: true,
			reason: "self",
			privacy: buildPrivacyMeta(true, "self"),
		};
	}

	const [viewer, target] = await Promise.all([
		getProfileContext(viewerUserId),
		getProfileContext(targetUserId),
	]);

	if (!viewer || !target) {
		return {
			sensitiveVisible: false,
			reason: "user_not_found",
			privacy: buildPrivacyMeta(false, "user_not_found"),
		};
	}

	if (viewer.role === "Admin") {
		return {
			sensitiveVisible: true,
			reason: "admin",
			privacy: buildPrivacyMeta(true, "admin"),
		};
	}

	const viewerVerified = await chatAccessService.isVerifiedUser(viewerUserId);
	const targetVerified = await chatAccessService.isVerifiedUser(targetUserId);

	if (!viewerVerified.ok || !targetVerified.ok) {
		const reason = !viewerVerified.ok ? viewerVerified.reason : targetVerified.reason;
		if (endpoint) {
			await logProfileAccess({
				viewerUserId,
				targetUserId,
				endpoint,
				sensitiveVisible: false,
				unlockReason: reason,
			});
		}
		return {
			sensitiveVisible: false,
			reason: "verification_required",
			privacy: buildPrivacyMeta(false, "verification_required"),
		};
	}

	const rel = await hasRelationshipUnlock(viewer, target);
	if (rel.unlocked) {
		if (endpoint) {
			await logProfileAccess({
				viewerUserId,
				targetUserId,
				endpoint,
				sensitiveVisible: true,
				unlockReason: rel.reason,
			});
		}
		return {
			sensitiveVisible: true,
			reason: rel.reason,
			privacy: buildPrivacyMeta(true, rel.reason),
		};
	}

	if (endpoint) {
		await logProfileAccess({
			viewerUserId,
			targetUserId,
			endpoint,
			sensitiveVisible: false,
			unlockReason: "relationship_required",
		});
	}

	return {
		sensitiveVisible: false,
		reason: "relationship_required",
		privacy: buildPrivacyMeta(false, "relationship_required"),
	};
}

function buildPrivacyMeta(sensitiveVisible, reason) {
	return {
		sensitive_visible: sensitiveVisible,
		unlock_reason: reason || null,
		message: sensitiveVisible
			? null
			: "Contact details are protected. They unlock after both accounts are verified and a funding, mentorship, payment, or collaboration relationship is established on StartupConnect.",
	};
}

async function logProfileAccess({
	viewerUserId,
	targetUserId,
	endpoint,
	sensitiveVisible,
	unlockReason,
}) {
	try {
		await pool.query(
			`INSERT INTO profile_access_logs (viewer_user_id, target_user_id, endpoint, sensitive_visible, unlock_reason)
       VALUES ($1, $2, $3, $4, $5)`,
			[viewerUserId, targetUserId, endpoint, Boolean(sensitiveVisible), unlockReason || null],
		);
	} catch {
		// Non-blocking audit
	}
}

/** Resolve target user id from entity row */
function targetUserIdFromRow(row) {
	if (!row) return null;
	return row.user_id ?? row.owner_user_id ?? row.startup_user_id ?? null;
}

module.exports = {
	getProfileContext,
	evaluateSensitiveAccess,
	logProfileAccess,
	hasCompletedPaymentBetween,
	hasRelationshipUnlock,
	buildPrivacyMeta,
	targetUserIdFromRow,
};
