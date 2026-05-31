-- Payment gateway and admin review columns (Chapa / escrow / fraud)

ALTER TABLE payments ADD COLUMN IF NOT EXISTS tx_ref VARCHAR(120);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS checkout_url TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_reference VARCHAR(180);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(30) NOT NULL DEFAULT 'not_applicable';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_authorized_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_released_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_refunded_at TIMESTAMPTZ;

ALTER TABLE payments ADD COLUMN IF NOT EXISTS fraud_flags JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_suspicious BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_status VARCHAR(30);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS chargeback_status VARCHAR(30);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_status VARCHAR(40);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_reference TEXT;

ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_contract_version VARCHAR(80);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_contract_accepted_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_contract_snapshot JSONB;

ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_status_check;
ALTER TABLE payments ADD CONSTRAINT payments_status_check
  CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'));

CREATE UNIQUE INDEX IF NOT EXISTS payments_tx_ref_uidx ON payments (tx_ref) WHERE tx_ref IS NOT NULL;

CREATE TABLE IF NOT EXISTS payment_dispute_logs (
    dispute_log_id SERIAL PRIMARY KEY,
    payment_id INTEGER NOT NULL REFERENCES payments(payment_id) ON DELETE CASCADE,
    action VARCHAR(40) NOT NULL,
    status VARCHAR(40) NOT NULL,
    notes TEXT,
    created_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
