-- Admin monitoring extensions: login attempts, suspicious activity events.

CREATE TABLE IF NOT EXISTS auth_login_attempts (
    attempt_id SERIAL PRIMARY KEY,
    email TEXT,
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    success BOOLEAN NOT NULL,
    failure_reason VARCHAR(50),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_auth_login_attempts_created ON auth_login_attempts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_login_attempts_user ON auth_login_attempts (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auth_login_attempts_ip ON auth_login_attempts (ip_address, created_at DESC);

CREATE TABLE IF NOT EXISTS security_events (
    event_id SERIAL PRIMARY KEY,
    event_type VARCHAR(80) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'low', 'medium', 'high')),
    user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    email TEXT,
    ip_address INET,
    user_agent TEXT,
    details TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events (event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_user ON security_events (user_id, created_at DESC);

