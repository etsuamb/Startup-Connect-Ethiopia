-- Profile privacy: access audit for sensitive contact visibility

CREATE TABLE IF NOT EXISTS profile_access_logs (
    log_id SERIAL PRIMARY KEY,
    viewer_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    target_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    endpoint VARCHAR(200) NOT NULL,
    sensitive_visible BOOLEAN NOT NULL DEFAULT FALSE,
    unlock_reason VARCHAR(80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profile_access_logs_created ON profile_access_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profile_access_logs_target ON profile_access_logs (target_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profile_access_logs_viewer ON profile_access_logs (viewer_user_id, created_at DESC);
