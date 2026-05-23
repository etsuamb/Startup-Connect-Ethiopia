const fs = require("fs/promises");
const path = require("path");
const pool = require("../config/db");

async function clearUploadsDirectory() {
	const uploadsDir = path.join(__dirname, "..", "uploads");

	try {
		const entries = await fs.readdir(uploadsDir, { withFileTypes: true });
		await Promise.all(
			entries.map(async (entry) => {
				const entryPath = path.join(uploadsDir, entry.name);
				if (entry.isFile()) {
					await fs.unlink(entryPath);
					return;
				}
				if (entry.isDirectory()) {
					await fs.rm(entryPath, { recursive: true, force: true });
				}
			}),
		);
	} catch (err) {
		if (err.code !== "ENOENT") {
			throw err;
		}
	}
}

async function main() {
	const client = await pool.connect();

	try {
		console.log("Starting database record clearing (keeping Admin records)...");
		await client.query("BEGIN");

		// Fetch admin user IDs to double-check who we are keeping
		const adminRes = await client.query("SELECT user_id, email, first_name, last_name FROM users WHERE role = 'Admin'");
		console.log(`Found ${adminRes.rowCount} Admin user(s) to keep:`, adminRes.rows);

		// Clear tables that don't cascade automatically or might have NULL constraints
		await client.query("DELETE FROM audit_logs");
		await client.query("DELETE FROM payments");
		await client.query("DELETE FROM messages");
		await client.query("DELETE FROM notifications");

		// Delete all non-admin users. This will cascade-delete startups, investors, mentors, projects, documents, etc.
		const deleteUsersRes = await client.query("DELETE FROM users WHERE role <> 'Admin'");
		console.log(`Deleted ${deleteUsersRes.rowCount} non-admin user records from users table (and cascade-deleted related rows).`);

		await client.query("COMMIT");
		console.log("Database transaction committed successfully.");

		// Clear uploads files since there are no more non-admin documents
		await clearUploadsDirectory();
		console.log("Uploads directory cleared successfully.");

	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Database record clearing failed. Transaction rolled back:", err.message);
		process.exitCode = 1;
	} finally {
		client.release();
		await pool.end();
	}
}

main();
