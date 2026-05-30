-- Authentication and account security fields used by registration, Google OAuth, and 2FA.

ALTER TABLE users ADD COLUMN IF NOT EXISTS provider_type VARCHAR(20) NOT NULL DEFAULT 'local';
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_method VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_secret TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_backup_hashes JSONB;

CREATE UNIQUE INDEX IF NOT EXISTS ux_users_google_id
    ON users (google_id)
    WHERE google_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS auth_email_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    purpose VARCHAR(40) NOT NULL,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_email_tokens_lookup
    ON auth_email_tokens (token_hash, purpose)
    WHERE used_at IS NULL;

CREATE TABLE IF NOT EXISTS auth_pending_logins (
    pending_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    ip_address VARCHAR(45),
    consumed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_pending_logins_lookup
    ON auth_pending_logins (token_hash)
    WHERE consumed_at IS NULL;
