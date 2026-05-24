const pool = require("../config/db");

function parseLimitOffset(query, defaultLimit = 50) {
	const limit = Math.min(200, Math.max(1, Number(query.limit) || defaultLimit));
	const offset = Math.max(0, Number(query.offset) || 0);
	return { limit, offset };
}

/** GET /api/admin/dashboard/monitoring/login-attempts */
exports.listLoginAttempts = async (req, res) => {
	try {
		const { limit, offset } = parseLimitOffset(req.query);
		const email = req.query.email ? String(req.query.email) : null;
		const ip = req.query.ip ? String(req.query.ip) : null;
		const success =
			typeof req.query.success === "string" ? req.query.success : null;

		const params = [];
		const conds = [];
		if (email) {
			params.push(email);
			conds.push(`la.email = $${params.length}`);
		}
		if (ip) {
			params.push(ip);
			conds.push(`la.ip_address::text = $${params.length}`);
		}
		if (success === "true" || success === "false") {
			params.push(success === "true");
			conds.push(`la.success = $${params.length}`);
		}

		const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";
		params.push(limit, offset);

		const r = await pool.query(
			`SELECT la.attempt_id, la.email, la.user_id, la.success, la.failure_reason,
              la.ip_address, la.user_agent, la.created_at,
              u.role, u.is_active, u.is_approved
       FROM auth_login_attempts la
       LEFT JOIN users u ON u.user_id = la.user_id
       ${where}
       ORDER BY la.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
			params,
		);

		return res.json({ attempts: r.rows, limit, offset });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** GET /api/admin/dashboard/monitoring/security-events */
exports.listSecurityEvents = async (req, res) => {
	try {
		const { limit, offset } = parseLimitOffset(req.query);
		const eventType = req.query.type ? String(req.query.type) : null;
		const severity = req.query.severity ? String(req.query.severity) : null;

		const params = [];
		const conds = [];
		if (eventType) {
			params.push(eventType);
			conds.push(`e.event_type = $${params.length}`);
		}
		if (severity) {
			params.push(severity);
			conds.push(`e.severity = $${params.length}`);
		}

		const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";
		params.push(limit, offset);

		const r = await pool.query(
			`SELECT e.event_id, e.event_type, e.severity, e.user_id, e.email, e.ip_address,
              e.user_agent, e.details, e.metadata, e.created_at,
              u.role, u.is_active, u.is_approved
       FROM security_events e
       LEFT JOIN users u ON u.user_id = e.user_id
       ${where}
       ORDER BY e.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
			params,
		);
		return res.json({ events: r.rows, limit, offset });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

/** GET /api/admin/dashboard/monitoring/summary */
exports.getMonitoringSummary = async (req, res) => {
	try {
		const windowHours = Number(req.query.hours) || 24;
		const r = await pool.query(
			`SELECT
         (SELECT COUNT(*)::int FROM auth_login_attempts WHERE created_at > NOW() - make_interval(hours => $1::int)) AS login_attempts,
         (SELECT COUNT(*)::int FROM auth_login_attempts WHERE success = FALSE AND created_at > NOW() - make_interval(hours => $1::int)) AS failed_logins,
         (SELECT COUNT(*)::int FROM security_events WHERE created_at > NOW() - make_interval(hours => $1::int)) AS security_events,
         (SELECT COUNT(*)::int FROM security_events WHERE severity IN ('medium', 'high') AND created_at > NOW() - make_interval(hours => $1::int)) AS elevated_security_events`,
			[windowHours],
		);

		const topIps = await pool.query(
			`SELECT ip_address::text AS ip, COUNT(*)::int AS failed
       FROM auth_login_attempts
       WHERE success = FALSE AND ip_address IS NOT NULL
         AND created_at > NOW() - make_interval(hours => $1::int)
       GROUP BY ip_address
       ORDER BY failed DESC
       LIMIT 10`,
			[windowHours],
		);

		const topEmails = await pool.query(
			`SELECT email, COUNT(*)::int AS failed
       FROM auth_login_attempts
       WHERE success = FALSE AND email IS NOT NULL
         AND created_at > NOW() - make_interval(hours => $1::int)
       GROUP BY email
       ORDER BY failed DESC
       LIMIT 10`,
			[windowHours],
		);

		return res.json({
			window_hours: windowHours,
			summary: r.rows[0],
			top_failed_ips: topIps.rows,
			top_failed_emails: topEmails.rows,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

