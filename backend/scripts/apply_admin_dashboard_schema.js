/**
 * Adds columns required by /api/admin/dashboard endpoints.
 * Run: node scripts/apply_admin_dashboard_schema.js
 */
const pool = require("../config/db");

async function run() {
	await pool.query(`
		ALTER TABLE startups
		ADD COLUMN IF NOT EXISTS admin_status VARCHAR(20) DEFAULT 'Pending'
	`);
	await pool.query(`
		DO $$
		BEGIN
			IF NOT EXISTS (
				SELECT 1 FROM pg_constraint WHERE conname = 'startups_admin_status_check'
			) THEN
				ALTER TABLE startups
				ADD CONSTRAINT startups_admin_status_check
				CHECK (admin_status IN ('Active', 'Pending', 'Funded', 'Closed'));
			END IF;
		END $$
	`);

	await pool.query(`
		ALTER TABLE documents
		ADD COLUMN IF NOT EXISTS verification_status VARCHAR(20) DEFAULT 'pending'
	`);
	await pool.query(`
		DO $$
		BEGIN
			IF NOT EXISTS (
				SELECT 1 FROM pg_constraint WHERE conname = 'documents_verification_status_check'
			) THEN
				ALTER TABLE documents
				ADD CONSTRAINT documents_verification_status_check
				CHECK (verification_status IN ('pending', 'verified', 'rejected'));
			END IF;
		END $$
	`);

	await pool.query(`
		ALTER TABLE mentor_documents
		ADD COLUMN IF NOT EXISTS verification_status VARCHAR(20) DEFAULT 'pending'
	`);
	await pool.query(`
		DO $$
		BEGIN
			IF NOT EXISTS (
				SELECT 1 FROM pg_constraint WHERE conname = 'mentor_documents_verification_status_check'
			) THEN
				ALTER TABLE mentor_documents
				ADD CONSTRAINT mentor_documents_verification_status_check
				CHECK (verification_status IN ('pending', 'verified', 'rejected'));
			END IF;
		END $$
	`);

	await pool.query(`
		ALTER TABLE users ADD COLUMN IF NOT EXISTS rejection_reason TEXT
	`);
	await pool.query(`
		ALTER TABLE users ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMPTZ
	`);
	await pool.query(`
		ALTER TABLE users ADD COLUMN IF NOT EXISTS rejected_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL
	`);
	await pool.query(`
		ALTER TABLE startups ADD COLUMN IF NOT EXISTS is_listed BOOLEAN DEFAULT FALSE
	`);

	console.log("Admin dashboard schema applied.");
}

run()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(() => pool.end());
