-- Admin UC extensions: platform config, categories, disputes, content flags, payment admin fields

CREATE TABLE IF NOT EXISTS platform_settings (
    setting_key VARCHAR(80) PRIMARY KEY,
    setting_value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS platform_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    category_type VARCHAR(40) NOT NULL DEFAULT 'industry',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS investment_disputes (
    dispute_id SERIAL PRIMARY KEY,
    investment_id INTEGER REFERENCES investments(investment_id) ON DELETE CASCADE,
    investment_request_id INTEGER REFERENCES investment_requests(investment_request_id) ON DELETE CASCADE,
    reported_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    reason TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'dismissed')),
    resolution_notes TEXT,
    resolved_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_flags (
    flag_id SERIAL PRIMARY KEY,
    entity_type VARCHAR(40) NOT NULL,
    entity_id INTEGER NOT NULL,
    flagged_by_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    reason TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'removed', 'dismissed')),
    reviewed_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (entity_type, entity_id)
);

CREATE TABLE IF NOT EXISTS system_error_logs (
    log_id SERIAL PRIMARY KEY,
    source VARCHAR(80) NOT NULL,
    level VARCHAR(20) NOT NULL DEFAULT 'error',
    message TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_suspicious BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_status VARCHAR(20) DEFAULT NULL;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS chargeback_status VARCHAR(20) DEFAULT NULL;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS admin_notes TEXT;

ALTER TABLE investment_requests ADD COLUMN IF NOT EXISTS admin_verified BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE investment_requests ADD COLUMN IF NOT EXISTS admin_verified_at TIMESTAMPTZ;
ALTER TABLE investment_requests ADD COLUMN IF NOT EXISTS admin_verified_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL;

ALTER TABLE investments ADD COLUMN IF NOT EXISTS admin_verified BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN NOT NULL DEFAULT FALSE;

INSERT INTO platform_settings (setting_key, setting_value)
VALUES (
    'platform_config',
    '{"userRegistration":true,"strictVerification":false,"twoFactorRequired":false,"notifNewUsers":true,"notifVerification":true,"notifAlerts":true}'::jsonb
)
ON CONFLICT (setting_key) DO NOTHING;

INSERT INTO platform_categories (name, slug, category_type) VALUES
    ('Technology', 'technology', 'industry'),
    ('Agriculture', 'agriculture', 'industry'),
    ('Health', 'health', 'industry'),
    ('Fintech', 'fintech', 'industry')
ON CONFLICT (slug) DO NOTHING;

CREATE INDEX IF NOT EXISTS idx_investment_disputes_status ON investment_disputes (status);
CREATE INDEX IF NOT EXISTS idx_content_flags_status ON content_flags (status);
CREATE INDEX IF NOT EXISTS idx_payments_suspicious ON payments (is_suspicious) WHERE is_suspicious = TRUE;
