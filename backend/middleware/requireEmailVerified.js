const pool = require("../config/db");

/** Requires verified email for platform access (admin exempt). Use after authenticate. */
exports.requireEmailVerified = async (req, res, next) => {
	try {
		if (req.user?.role === "Admin") return next();
		const r = await pool.query(
			`SELECT email_verified, is_active FROM users WHERE user_id = $1`,
			[req.user.user_id],
		);
		if (!r.rowCount) return res.status(404).json({ message: "User not found" });
		const u = r.rows[0];
		if (!u.is_active) return res.status(403).json({ message: "Account disabled" });
		if (!u.email_verified) {
			return res.status(403).json({
				message: "Please verify your email address before using this feature.",
				code: "EMAIL_NOT_VERIFIED",
			});
		}
		next();
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
