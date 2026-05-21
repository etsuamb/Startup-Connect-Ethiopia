const pool = require("../config/db");

async function columnExists(table, column) {
	const res = await pool.query(
		`SELECT column_name FROM information_schema.columns WHERE table_name=$1 AND column_name = $2`,
		[table, column],
	);
	return res.rowCount > 0;
}

async function addColumnIfMissing(columnDef) {
	try {
		await pool.query(columnDef);
		console.log("Executed:", columnDef);
	} catch (err) {
		console.error("Failed to execute:", columnDef, err.message || err);
		throw err;
	}
}

async function main() {
	// Add updated_at to users
	if (!(await columnExists("users", "updated_at"))) {
		await addColumnIfMissing(
			"ALTER TABLE users ADD COLUMN updated_at TIMESTAMPTZ"
		);
	} else {
		console.log("users.updated_at exists");
	}

	// Add device to refresh_tokens
	if (!(await columnExists("refresh_tokens", "device"))) {
		await addColumnIfMissing(
			"ALTER TABLE refresh_tokens ADD COLUMN device VARCHAR(255)"
		);
	} else {
		console.log("refresh_tokens.device exists");
	}

	// Add ip_address to refresh_tokens
	if (!(await columnExists("refresh_tokens", "ip_address"))) {
		await addColumnIfMissing(
			"ALTER TABLE refresh_tokens ADD COLUMN ip_address VARCHAR(45)"
		);
	} else {
		console.log("refresh_tokens.ip_address exists");
	}

	// Add location to refresh_tokens
	if (!(await columnExists("refresh_tokens", "location"))) {
		await addColumnIfMissing(
			"ALTER TABLE refresh_tokens ADD COLUMN location VARCHAR(255)"
		);
	} else {
		console.log("refresh_tokens.location exists");
	}

	console.log("Settings-related database schema updates complete!");
	await pool.end();
}

main().catch((err) => {
	console.error("Settings schema update failed:", err.message || err);
	process.exit(1);
});
