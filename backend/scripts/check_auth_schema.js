const pool = require("../config/db");

async function main() {
	const cols = await pool.query(
		`SELECT column_name FROM information_schema.columns
     WHERE table_name = 'users' AND column_name IN ('email_verified', 'provider_type')`,
	);
	console.log("users columns:", cols.rows);
	const tok = await pool.query(`SELECT to_regclass('public.auth_email_tokens') AS t`);
	console.log("auth_email_tokens:", tok.rows[0]?.t);
	await pool.end();
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
