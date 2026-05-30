const pool = require("../config/db");

const DEFAULT_CONFIG = {
	userRegistration: true,
	strictVerification: false,
	twoFactorRequired: false,
	notifNewUsers: true,
	notifVerification: true,
	notifAlerts: true,
};

async function ensurePlatformSettingsSchema() {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS platform_settings (
			setting_key VARCHAR(80) PRIMARY KEY,
			setting_value JSONB NOT NULL DEFAULT '{}',
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL
		)
	`);
	await pool.query(
		`INSERT INTO platform_settings (setting_key, setting_value)
		 VALUES ('platform_config', $1::jsonb)
		 ON CONFLICT (setting_key) DO NOTHING`,
		[JSON.stringify(DEFAULT_CONFIG)],
	);
}

async function getPlatformConfig() {
	try {
		await ensurePlatformSettingsSchema();
		const r = await pool.query(
			`SELECT setting_value FROM platform_settings WHERE setting_key = 'platform_config' LIMIT 1`,
		);
		if (!r.rows.length) return { ...DEFAULT_CONFIG };
		return { ...DEFAULT_CONFIG, ...r.rows[0].setting_value };
	} catch {
		return { ...DEFAULT_CONFIG };
	}
}

module.exports = { getPlatformConfig, DEFAULT_CONFIG };
