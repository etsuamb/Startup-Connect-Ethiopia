const pool = require("../config/db");

/** Idempotent payment columns used by admin and gateway flows. */
async function ensurePaymentSchema() {
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS tx_ref VARCHAR(120)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS checkout_url TEXT");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_reference VARCHAR(180)");
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP",
	);
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(30) NOT NULL DEFAULT 'not_applicable'",
	);
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_authorized_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_released_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_refunded_at TIMESTAMPTZ");
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS fraud_flags JSONB NOT NULL DEFAULT '[]'::jsonb",
	);
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_suspicious BOOLEAN NOT NULL DEFAULT false",
	);
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_status VARCHAR(30)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS chargeback_status VARCHAR(30)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS admin_notes TEXT");
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0",
	);
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_status VARCHAR(40)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_reference TEXT");
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_contract_version VARCHAR(80)",
	);
	await pool.query(
		"ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_contract_accepted_at TIMESTAMPTZ",
	);
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_contract_snapshot JSONB");
	await pool.query(`
		CREATE TABLE IF NOT EXISTS payment_dispute_logs (
			dispute_log_id SERIAL PRIMARY KEY,
			payment_id INTEGER NOT NULL REFERENCES payments(payment_id) ON DELETE CASCADE,
			action VARCHAR(40) NOT NULL,
			status VARCHAR(40) NOT NULL,
			notes TEXT,
			created_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`);
}

module.exports = { ensurePaymentSchema };
