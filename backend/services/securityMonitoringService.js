const pool = require("../config/db");

function readIpAddress(req) {
	const raw =
		req.headers["x-forwarded-for"] || req.socket?.remoteAddress || req.ip || null;
	if (!raw) return null;
	const ip = String(raw).split(",")[0].trim();
	return ip.includes("::ffff:") ? ip.split("::ffff:")[1] : ip;
}

async function logLoginAttempt({
	email,
	userId = null,
	success,
	failureReason = null,
	ipAddress = null,
	userAgent = null,
}) {
	await pool.query(
		`INSERT INTO auth_login_attempts (email, user_id, success, failure_reason, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)`,
		[email || null, userId, Boolean(success), failureReason, ipAddress, userAgent || null],
	);
}

async function recordSecurityEvent({
	eventType,
	severity = "info",
	userId = null,
	email = null,
	ipAddress = null,
	userAgent = null,
	details = null,
	metadata = null,
}) {
	await pool.query(
		`INSERT INTO security_events (event_type, severity, user_id, email, ip_address, user_agent, details, metadata)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
		[eventType, severity, userId, email, ipAddress, userAgent, details, metadata],
	);
}

/**
 * If many failures happen from the same IP/email in a short window, create a security event.
 * Keep logic conservative to avoid noisy logs.
 */
async function detectAndRecordBruteForce({ email, ipAddress }) {
	if (!email && !ipAddress) return;
	const windowMinutes = 15;
	const threshold = 8;

	const r = await pool.query(
		`SELECT COUNT(*)::int AS c
     FROM auth_login_attempts
     WHERE success = FALSE
       AND created_at > NOW() - make_interval(mins => $1::int)
       AND (
         ($2::text IS NOT NULL AND email = $2)
         OR ($3::inet IS NOT NULL AND ip_address = $3)
       )`,
		[windowMinutes, email || null, ipAddress || null],
	);
	const c = r.rows[0]?.c ?? 0;
	if (c < threshold) return;

	await recordSecurityEvent({
		eventType: "bruteforce_suspected",
		severity: "medium",
		email,
		ipAddress,
		details: `Detected ${c} failed login attempts in the last ${windowMinutes} minutes.`,
		metadata: { failures: c, window_minutes: windowMinutes },
	});
}

module.exports = {
	readIpAddress,
	logLoginAttempt,
	recordSecurityEvent,
	detectAndRecordBruteForce,
};

