-- Authentication security extensions (email verification, OAuth, 2FA, password reset)

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS provider_type VARCHAR(20) NOT NULL DEFAULT 'local'
  CHECK (provider_type IN ('local', 'google'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(128);
ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_secret VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_method VARCHAR(20)
  CHECK (two_factor_method IS NULL OR two_factor_method IN ('email', 'totp'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_backup_hashes JSONB;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS login_attempt_count INTEGER NOT NULL DEFAULT 0;

-- Allow Google-only accounts without a usable local password (application sets random hash)
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_id ON users (google_id) WHERE google_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS auth_email_tokens (
    token_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    purpose VARCHAR(40) NOT NULL,
    token_hash VARCHAR(128) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_email_tokens_user_purpose ON auth_email_tokens (user_id, purpose, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_email_tokens_hash ON auth_email_tokens (token_hash);

CREATE TABLE IF NOT EXISTS auth_pending_logins (
    pending_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token_hash VARCHAR(128) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    consumed_at TIMESTAMPTZ,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_pending_logins_user ON auth_pending_logins (user_id, created_at DESC);

-- Grandfather active accounts; new signups remain unverified until email link
UPDATE users SET email_verified = true WHERE role = 'Admin';
UPDATE users SET email_verified = true WHERE provider_type = 'google';
UPDATE users SET email_verified = true
WHERE provider_type = 'local' AND email_verified = false
  AND (is_approved = true OR last_login_at IS NOT NULL);
