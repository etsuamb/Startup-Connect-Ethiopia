const pool = require("../config/db");

const DEFAULT_CONFIG = {
	userRegistration: true,
	strictVerification: false,
	twoFactorRequired: false,
	notifNewUsers: true,
	notifVerification: true,
	notifAlerts: true,
};

async function getPlatformConfig() {
	try {
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
