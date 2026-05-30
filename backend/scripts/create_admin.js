const pool = require("../config/db");
const bcrypt = require("bcrypt");

const ADMIN_EMAIL = "admin@startupconnect.test";
const ADMIN_PASSWORD = "AdminPass123!";

(async () => {
	try {
		const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

		const exists = await pool.query(
			"SELECT user_id FROM users WHERE email=$1",
			[ADMIN_EMAIL],
		);

		let userId;
		if (exists.rows.length) {
			userId = exists.rows[0].user_id;
			await pool.query(
				`UPDATE users
         SET password_hash=$1, role='Admin', is_approved=true, is_active=true,
             email_verified=true, provider_type='local', updated_at=NOW()
         WHERE user_id=$2`,
				[hash, userId],
			);
			console.log("Admin user already exists; password reset:", ADMIN_EMAIL);
		} else {
			const inserted = await pool.query(
				`INSERT INTO users (
           first_name, last_name, email, password_hash, role,
           is_approved, is_active, email_verified, provider_type, created_at
         )
         VALUES ($1,$2,$3,$4,'Admin',true,true,true,'local',NOW())
         RETURNING user_id`,
				["Platform", "Admin", ADMIN_EMAIL, hash],
			);
			userId = inserted.rows[0].user_id;
			console.log("Created admin user:", ADMIN_EMAIL);
		}

		const adminRow = await pool.query(
			"SELECT admin_id FROM admins WHERE user_id=$1",
			[userId],
		);
		if (!adminRow.rows.length) {
			await pool.query(
				"INSERT INTO admins (user_id, privilege_level) VALUES ($1, $2)",
				[userId, 10],
			);
			console.log("Linked admins profile (privilege_level 10)");
		} else {
			await pool.query(
				"UPDATE admins SET privilege_level = $1 WHERE user_id = $2",
				[10, userId],
			);
		}

		console.log("Credentials:");
		console.log("  email:", ADMIN_EMAIL);
		console.log("  password:", ADMIN_PASSWORD);
		console.log("  login: POST /api/auth/login");
		process.exit(0);
	} catch (err) {
		console.error("Error creating admin:", err.message || err);
		process.exit(1);
	}
})();
