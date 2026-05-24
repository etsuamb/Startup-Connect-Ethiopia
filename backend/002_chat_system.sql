-- Chat moderation extensions + collaboration unlock for StartupConnect Ethiopia

-- Collaboration between startups (chat unlock path)
CREATE TABLE IF NOT EXISTS collaboration_requests (
    collaboration_id SERIAL PRIMARY KEY,
    requester_startup_id INTEGER NOT NULL REFERENCES startups(startup_id) ON DELETE CASCADE,
    partner_startup_id INTEGER NOT NULL REFERENCES startups(startup_id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'cancelled')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (requester_startup_id, partner_startup_id),
    CHECK (requester_startup_id <> partner_startup_id)
);

CREATE INDEX IF NOT EXISTS idx_collaboration_requests_requester ON collaboration_requests (requester_startup_id);
CREATE INDEX IF NOT EXISTS idx_collaboration_requests_partner ON collaboration_requests (partner_startup_id);

-- Mentor chat moderation logs (parity with investor chat)
CREATE TABLE IF NOT EXISTS mentor_chat_moderation_logs (
    log_id SERIAL PRIMARY KEY,
    sender_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    mentor_conversation_id INTEGER NOT NULL REFERENCES mentor_chat_conversations(mentor_conversation_id) ON DELETE CASCADE,
    attempted_message TEXT NOT NULL,
    flagged_reason VARCHAR(100) NOT NULL,
    chat_channel VARCHAR(30) NOT NULL DEFAULT 'mentor',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mentor_chat_moderation_sender ON mentor_chat_moderation_logs (sender_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_chat_moderation_conv ON mentor_chat_moderation_logs (mentor_conversation_id, created_at DESC);

-- Extend investor chat moderation logs
ALTER TABLE chat_moderation_logs ADD COLUMN IF NOT EXISTS chat_channel VARCHAR(30) NOT NULL DEFAULT 'investor';
ALTER TABLE chat_moderation_logs ADD COLUMN IF NOT EXISTS admin_notified BOOLEAN NOT NULL DEFAULT FALSE;

-- Per-user violation tracking for repeat offenders
CREATE TABLE IF NOT EXISTS chat_user_violations (
    violation_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    violation_count INTEGER NOT NULL DEFAULT 0,
    last_violation_at TIMESTAMPTZ,
    admin_warned_at TIMESTAMPTZ,
    is_chat_suspended BOOLEAN NOT NULL DEFAULT FALSE,
    suspended_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_user_violations_user ON chat_user_violations (user_id);

-- Admin moderation actions audit
CREATE TABLE IF NOT EXISTS chat_moderation_actions (
    action_id SERIAL PRIMARY KEY,
    admin_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    target_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    notes TEXT,
    reference_log_id INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chat_moderation_actions_created ON chat_moderation_actions (created_at DESC);
