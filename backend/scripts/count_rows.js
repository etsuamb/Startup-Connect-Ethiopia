const pool = require("../config/db");

async function main() {
	const client = await pool.connect();
	try {
		// Query all user tables in public schema
		const tablesRes = await client.query(
			"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
		);
		const tables = tablesRes.rows.map(r => r.table_name);
		console.log(`Found ${tables.length} tables in schema 'public':`, tables);

		console.log("\nChecking row counts for all tables...");
		for (const table of tables) {
			const res = await client.query(`SELECT COUNT(*) FROM "${table}"`);
			const count = parseInt(res.rows[0].count, 10);
			if (count > 0) {
				console.log(`Table: ${table} - Count: ${count}`);
				// Let's print some info to verify if it contains non-admin data
				const sample = await client.query(`SELECT * FROM "${table}" LIMIT 5`);
				console.log(`Sample from ${table}:`, sample.rows);
			} else {
				console.log(`Table: ${table} - Count: ${count}`);
			}
		}
	} catch (err) {
		console.error("Error checking row counts:", err.message);
	} finally {
		client.release();
		await pool.end();
	}
}

main();
