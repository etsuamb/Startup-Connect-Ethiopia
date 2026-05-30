const fs = require("fs/promises");
const path = require("path");
const pool = require("../config/db");

const BACKUP_DIR = path.join(__dirname, "..", "backups");

async function ensurePlatformAdminSchema() {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS platform_settings (
			setting_key VARCHAR(80) PRIMARY KEY,
			setting_value JSONB NOT NULL DEFAULT '{}',
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL
		)
	`);
	await pool.query(`
		CREATE TABLE IF NOT EXISTS platform_categories (
			category_id SERIAL PRIMARY KEY,
			name VARCHAR(120) NOT NULL,
			slug VARCHAR(120) NOT NULL UNIQUE,
			category_type VARCHAR(40) NOT NULL DEFAULT 'industry',
			is_active BOOLEAN NOT NULL DEFAULT TRUE,
			metadata JSONB NOT NULL DEFAULT '{}',
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`);
	await pool.query(`
		INSERT INTO platform_settings (setting_key, setting_value)
		VALUES (
			'platform_config',
			'{"userRegistration":true,"strictVerification":false,"twoFactorRequired":false,"notifNewUsers":true,"notifVerification":true,"notifAlerts":true}'::jsonb
		)
		ON CONFLICT (setting_key) DO NOTHING
	`);
	await pool.query(`
		INSERT INTO platform_categories (name, slug, category_type) VALUES
			('Technology', 'technology', 'industry'),
			('Agriculture', 'agriculture', 'industry'),
			('Health', 'health', 'industry'),
			('Fintech', 'fintech', 'industry')
		ON CONFLICT (slug) DO NOTHING
	`);
}

async function ensureAuditLogSchema() {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS audit_logs (
			log_id SERIAL PRIMARY KEY,
			actor_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
			action VARCHAR(100) NOT NULL,
			entity_type VARCHAR(50),
			entity_id INTEGER,
			details TEXT,
			metadata JSONB,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`);
}

async function ensureBackupLogSchema() {
	await ensurePlatformAdminSchema();
	await pool.query(`
		CREATE TABLE IF NOT EXISTS backup_logs (
			backup_log_id SERIAL PRIMARY KEY,
			status VARCHAR(20) NOT NULL DEFAULT 'started',
			file_name TEXT,
			file_path TEXT,
			file_size_bytes BIGINT,
			started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			completed_at TIMESTAMPTZ,
			error_message TEXT,
			created_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL
		)
	`);
	await pool.query("ALTER TABLE backup_logs ADD COLUMN IF NOT EXISTS restore_status VARCHAR(30)");
	await pool.query("ALTER TABLE backup_logs ADD COLUMN IF NOT EXISTS restore_started_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE backup_logs ADD COLUMN IF NOT EXISTS restore_completed_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE backup_logs ADD COLUMN IF NOT EXISTS restored_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL");
	await pool.query("ALTER TABLE backup_logs ADD COLUMN IF NOT EXISTS restore_error_message TEXT");
}

function safeBackupFileName(value) {
	return path.basename(String(value || ""));
}

async function createDatabaseSnapshot() {
	const tableRes = await pool.query(
		`SELECT table_name
		 FROM information_schema.tables
		 WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
		 ORDER BY table_name`,
	);
	const snapshot = {
		generated_at: new Date().toISOString(),
		format: "startupconnect-json-backup-v1",
		tables: {},
	};

	for (const { table_name: tableName } of tableRes.rows) {
		const columnRes = await pool.query(
			`SELECT column_name, data_type
			 FROM information_schema.columns
			 WHERE table_schema = 'public' AND table_name = $1
			 ORDER BY ordinal_position`,
			[tableName],
		);
		const selectedColumns = columnRes.rows
			.filter((column) => column.data_type !== "bytea")
			.map((column) => `"${column.column_name.replace(/"/g, '""')}"`);
		if (!selectedColumns.length) {
			snapshot.tables[tableName] = [];
			continue;
		}
		const rows = await pool.query(`SELECT ${selectedColumns.join(", ")} FROM "${tableName.replace(/"/g, '""')}"`);
		snapshot.tables[tableName] = rows.rows;
	}

	return snapshot;
}

async function ensurePaymentReviewSchema() {
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(30) NOT NULL DEFAULT 'not_applicable'");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_authorized_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_released_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_refunded_at TIMESTAMPTZ");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS fraud_flags JSONB NOT NULL DEFAULT '[]'::jsonb");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_suspicious BOOLEAN NOT NULL DEFAULT false");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_status VARCHAR(30)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS chargeback_status VARCHAR(30)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS admin_notes TEXT");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_status VARCHAR(40)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_reference TEXT");
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

function fraudScore(flags) {
	return Math.min(100, (Array.isArray(flags) ? flags.length : 0) * 25);
}

function buildAdminFraudFlags(payment, recentCount = 0, sameReceiverCount = 0) {
	const flags = [];
	const amount = Number(payment.amount || 0);
	if (amount >= 100000) flags.push({ code: "large_amount", label: "Large payment amount" });
	if (recentCount >= 3) flags.push({ code: "rapid_payments", label: "Multiple payments in one hour" });
	if (sameReceiverCount >= 5) flags.push({ code: "receiver_velocity", label: "Receiver has high recent payment velocity" });
	if (payment.status === "failed" && amount >= 50000) flags.push({ code: "large_failed_payment", label: "Large failed payment attempt" });
	if (payment.from_user_id && payment.from_user_id === payment.to_user_id) flags.push({ code: "same_sender_receiver", label: "Sender and receiver match" });
	return flags;
}

async function writeAudit(actorId, action, entityType, entityId, details, metadata = null) {
	try {
		await ensureAuditLogSchema();
		await pool.query(
			`INSERT INTO audit_logs (actor_user_id, action, entity_type, entity_id, details, metadata)
			 VALUES ($1,$2,$3,$4,$5,$6)`,
			[actorId, action, entityType, entityId, details, metadata ? JSON.stringify(metadata) : null],
		);
	} catch (err) {
		console.warn("[admin audit] skipped audit write:", err.message);
	}
}

// ——— Platform configuration ———

exports.getPlatformSettings = async (_req, res) => {
	try {
		await ensurePlatformAdminSchema();
		const r = await pool.query(
			`SELECT setting_key, setting_value, updated_at FROM platform_settings ORDER BY setting_key`,
		);
		const settings = {};
		for (const row of r.rows) settings[row.setting_key] = row.setting_value;
		return res.json({ settings });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.updatePlatformSettings = async (req, res) => {
	const admin = req.user;
	const { key = "platform_config", value } = req.body || {};
	if (!value || typeof value !== "object") {
		return res.status(400).json({ error: "value object required" });
	}
	try {
		await ensurePlatformAdminSchema();
		await pool.query(
			`INSERT INTO platform_settings (setting_key, setting_value, updated_by, updated_at)
			 VALUES ($1, $2::jsonb, $3, CURRENT_TIMESTAMP)
			 ON CONFLICT (setting_key) DO UPDATE SET
			   setting_value = EXCLUDED.setting_value,
			   updated_by = EXCLUDED.updated_by,
			   updated_at = CURRENT_TIMESTAMP`,
			[key, JSON.stringify(value), admin.user_id],
		);
		await writeAudit(admin.user_id, "update_platform_settings", "platform_settings", null, key);
		return res.json({ message: "Settings updated", key, value });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— Categories ———

exports.listCategories = async (req, res) => {
	const { type } = req.query;
	try {
		await ensurePlatformAdminSchema();
		let q = "SELECT * FROM platform_categories WHERE 1=1";
		const params = [];
		if (type) {
			params.push(type);
			q += ` AND category_type = $${params.length}`;
		}
		q += " ORDER BY name ASC";
		const r = await pool.query(q, params);
		return res.json({ categories: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.listPublicCategories = async (req, res) => {
	const { type } = req.query;
	try {
		let q = "SELECT * FROM platform_categories WHERE is_active = true";
		const params = [];
		if (type) {
			params.push(type);
			q += ` AND category_type = $${params.length}`;
		}
		q += " ORDER BY name ASC";
		const r = await pool.query(q, params);
		return res.json({ categories: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.createCategory = async (req, res) => {
	const { name, slug, category_type = "industry", metadata = {} } = req.body || {};
	if (!name || !slug) return res.status(400).json({ error: "name and slug required" });
	try {
		await ensurePlatformAdminSchema();
		const r = await pool.query(
			`INSERT INTO platform_categories (name, slug, category_type, metadata)
			 VALUES ($1,$2,$3,$4::jsonb) RETURNING *`,
			[name, slug, category_type, JSON.stringify(metadata)],
		);
		await writeAudit(req.user.user_id, "create_category", "platform_categories", r.rows[0].category_id, name);
		return res.status(201).json({ category: r.rows[0] });
	} catch (err) {
		if (err.code === "23505") return res.status(409).json({ error: "Slug already exists" });
		return res.status(500).json({ error: err.message });
	}
};

exports.updateCategory = async (req, res) => {
	const { id } = req.params;
	const { name, is_active, metadata } = req.body || {};
	try {
		await ensurePlatformAdminSchema();
		const r = await pool.query(
			`UPDATE platform_categories SET
			   name = COALESCE($1, name),
			   is_active = COALESCE($2, is_active),
			   metadata = COALESCE($3::jsonb, metadata),
			   updated_at = CURRENT_TIMESTAMP
			 WHERE category_id = $4 RETURNING *`,
			[name, is_active, metadata ? JSON.stringify(metadata) : null, id],
		);
		if (!r.rows.length) return res.status(404).json({ error: "Category not found" });
		return res.json({ category: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		await ensurePlatformAdminSchema();
		const r = await pool.query("DELETE FROM platform_categories WHERE category_id = $1 RETURNING category_id", [
			req.params.id,
		]);
		if (!r.rows.length) return res.status(404).json({ error: "Category not found" });
		return res.json({ message: "Category deleted" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// Public suggestion endpoint for new categories. Try to store in a suggestion table;
// if that table doesn't exist fall back to creating a disabled platform category.
exports.suggestCategory = async (req, res) => {
	const { name, category_type = "industry", contact_email = null, note = null } = req.body || {};
	if (!name) return res.status(400).json({ error: "name required" });
	try {
		// Primary: try suggestions table (if present)
		try {
			const r = await pool.query(
				`INSERT INTO category_suggestions (name, category_type, contact_email, note)
				 VALUES ($1,$2,$3,$4) RETURNING *`,
				[name.trim(), category_type, contact_email, note],
			);
			await writeAudit(req.user?.user_id || null, "suggest_category", "category_suggestions", r.rows[0].suggestion_id, name);
			return res.status(201).json({ suggestion: r.rows[0], message: "Suggestion received" });
		} catch (innerErr) {
			// If the suggestions table doesn't exist, fall back to adding a disabled platform category
			if (innerErr && /category_suggestions/.test(innerErr.message || "")) {
				const slug = name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
				const r2 = await pool.query(
					`INSERT INTO platform_categories (name, slug, category_type, is_active, metadata)
					 VALUES ($1,$2,$3,false,$4::jsonb) RETURNING *`,
					[name.trim(), slug, category_type, JSON.stringify({ suggested: true, contact_email, note })],
				);
				await writeAudit(req.user?.user_id || null, "suggest_category_fallback", "platform_categories", r2.rows[0].category_id, name);
				return res.status(201).json({ category: r2.rows[0], message: "Suggestion received (stored for admin review)" });
			}
			throw innerErr;
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— User audit & verify ———

exports.getUserAuditLogs = async (req, res) => {
	const { userId } = req.params;
	const { limit = 50, offset = 0 } = req.query;
	try {
		const r = await pool.query(
			`SELECT al.*, u.email AS actor_email
			 FROM audit_logs al
			 LEFT JOIN users u ON u.user_id = al.actor_user_id
			 WHERE al.entity_id = $1 OR al.actor_user_id = $1
			    OR al.details ILIKE '%' || $1::text || '%'
			 ORDER BY al.created_at DESC
			 LIMIT $2 OFFSET $3`,
			[userId, limit, offset],
		);
		return res.json({ logs: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.verifyUserEmail = async (req, res) => {
	const { userId } = req.params;
	try {
		const r = await pool.query(
			`UPDATE users SET email_verified = true, updated_at = CURRENT_TIMESTAMP
			 WHERE user_id = $1 RETURNING user_id, email, email_verified`,
			[userId],
		);
		if (!r.rows.length) return res.status(404).json({ error: "User not found" });
		await writeAudit(req.user.user_id, "admin_verify_email", "users", userId, null);
		return res.json({ user: r.rows[0], message: "Email marked verified" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.restoreUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const r = await pool.query(
			`UPDATE users SET is_active = true, is_approved = COALESCE(is_approved, false)
			 WHERE user_id = $1 RETURNING user_id, email, is_active, is_approved`,
			[userId],
		);
		if (!r.rows.length) return res.status(404).json({ error: "User not found" });
		await writeAudit(req.user.user_id, "restore_user", "users", userId, null);
		return res.json({ user: r.rows[0], message: "User restored" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— Investment disputes & legitimacy ———

exports.listInvestmentDisputes = async (_req, res) => {
	try {
		const r = await pool.query(
			`SELECT d.*,
			        ir.requested_amount, s.startup_name, i.organization_name
			 FROM investment_disputes d
			 LEFT JOIN investment_requests ir ON ir.investment_request_id = d.investment_request_id
			 LEFT JOIN startups s ON s.startup_id = ir.startup_id
			 LEFT JOIN investors i ON i.investor_id = ir.investor_id
			 ORDER BY d.created_at DESC`,
		);
		return res.json({ disputes: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.createInvestmentDispute = async (req, res) => {
	const { investment_id, investment_request_id, reason } = req.body || {};
	if (!reason) return res.status(400).json({ error: "reason required" });
	if (!investment_id && !investment_request_id) {
		return res.status(400).json({ error: "investment_id or investment_request_id required" });
	}
	try {
		const r = await pool.query(
			`INSERT INTO investment_disputes (investment_id, investment_request_id, reported_by_user_id, reason)
			 VALUES ($1,$2,$3,$4) RETURNING *`,
			[investment_id || null, investment_request_id || null, req.user.user_id, reason],
		);
		await writeAudit(req.user.user_id, "create_investment_dispute", "investment_disputes", r.rows[0].dispute_id, reason);
		return res.status(201).json({ dispute: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.resolveInvestmentDispute = async (req, res) => {
	const { id } = req.params;
	const { status, resolution_notes } = req.body || {};
	const allowed = ["investigating", "resolved", "dismissed"];
	if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
	try {
		const r = await pool.query(
			`UPDATE investment_disputes SET
			   status = $1,
			   resolution_notes = COALESCE($2, resolution_notes),
			   resolved_by = $3,
			   resolved_at = CASE WHEN $1 IN ('resolved','dismissed') THEN CURRENT_TIMESTAMP ELSE resolved_at END,
			   updated_at = CURRENT_TIMESTAMP
			 WHERE dispute_id = $4 RETURNING *`,
			[status, resolution_notes, req.user.user_id, id],
		);
		if (!r.rows.length) return res.status(404).json({ error: "Dispute not found" });
		return res.json({ dispute: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.verifyInvestmentLegitimacy = async (req, res) => {
	const { id } = req.params;
	const type = String(req.path || "").includes("investment-requests") ? "request" : "investment";
	const admin = req.user;
	try {
		if (type === "investment") {
			const r = await pool.query(
				`UPDATE investments SET admin_verified = true WHERE investment_id = $1 RETURNING *`,
				[id],
			);
			if (!r.rows.length) return res.status(404).json({ error: "Investment not found" });
			await writeAudit(admin.user_id, "verify_investment", "investments", id, null);
			return res.json({ investment: r.rows[0] });
		}
		const r = await pool.query(
			`UPDATE investment_requests SET admin_verified = true, admin_verified_at = CURRENT_TIMESTAMP, admin_verified_by = $1
			 WHERE investment_request_id = $2 RETURNING *`,
			[admin.user_id, id],
		);
		if (!r.rows.length) return res.status(404).json({ error: "Investment request not found" });
		await writeAudit(admin.user_id, "verify_investment_request", "investment_requests", id, null);
		return res.json({ investment_request: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— Payments: detail, refund, suspicious, chargeback ———

exports.getPaymentById = async (req, res) => {
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(
			`SELECT p.*,
			        u_from.email AS from_email, u_from.first_name AS from_first_name, u_from.last_name AS from_last_name,
			        u_to.email AS to_email, u_to.first_name AS to_first_name, u_to.last_name AS to_last_name
			 FROM payments p
			 JOIN users u_from ON u_from.user_id = p.from_user_id
			 JOIN users u_to ON u_to.user_id = p.to_user_id
			 WHERE p.payment_id = $1`,
			[req.params.paymentId],
		);
		if (!r.rows.length) return res.status(404).json({ error: "Payment not found" });
		return res.json({ payment: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.refundPayment = async (req, res) => {
	const { paymentId } = req.params;
	const { notes } = req.body || {};
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(
			`UPDATE payments
			 SET status = 'refunded',
			     refund_status = 'refunded',
			     escrow_status = CASE WHEN escrow_status IN ('held','released') THEN 'refunded' ELSE escrow_status END,
			     escrow_refunded_at = CURRENT_TIMESTAMP,
			     admin_notes = COALESCE($1, admin_notes),
			     updated_at = CURRENT_TIMESTAMP
			 WHERE payment_id = $2 AND status IN ('completed','refunded')
			 RETURNING *`,
			[notes, paymentId],
		);
		if (!r.rows.length) {
			return res.status(400).json({ error: "Payment not found or not refundable" });
		}
		await writeAudit(req.user.user_id, "refund_payment", "payments", paymentId, notes);
		return res.json({ payment: r.rows[0], message: "Payment marked refunded" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.flagPaymentSuspicious = async (req, res) => {
	const { paymentId } = req.params;
	const { suspicious = true, notes } = req.body || {};
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(
			`UPDATE payments
			 SET is_suspicious = $1,
			     fraud_flags = CASE
			       WHEN $1 = true AND jsonb_array_length(fraud_flags) = 0 THEN '[{"code":"manual_review","label":"Manually flagged by admin"}]'::jsonb
			       WHEN $1 = false THEN '[]'::jsonb
			       ELSE fraud_flags
			     END,
			     admin_notes = COALESCE($2, admin_notes),
			     updated_at = CURRENT_TIMESTAMP
			 WHERE payment_id = $3 RETURNING *`,
			[!!suspicious, notes, paymentId],
		);
		if (!r.rows.length) return res.status(404).json({ error: "Payment not found" });
		await writeAudit(req.user.user_id, suspicious ? "flag_payment_suspicious" : "unflag_payment", "payments", paymentId, notes);
		return res.json({ payment: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.recordChargeback = async (req, res) => {
	const { paymentId } = req.params;
	const { notes } = req.body || {};
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(
			`UPDATE payments
			 SET chargeback_status = 'open',
			     escrow_status = CASE WHEN escrow_status = 'held' THEN 'disputed' ELSE escrow_status END,
			     is_suspicious = true,
			     fraud_flags = CASE
			       WHEN fraud_flags @> '[{"code":"chargeback"}]'::jsonb THEN fraud_flags
			       ELSE fraud_flags || '[{"code":"chargeback","label":"Chargeback recorded"}]'::jsonb
			     END,
			     admin_notes = COALESCE($1, admin_notes),
			     updated_at = CURRENT_TIMESTAMP
			 WHERE payment_id = $2 RETURNING *`,
			[notes, paymentId],
		);
		if (!r.rows.length) return res.status(404).json({ error: "Payment not found" });
		await writeAudit(req.user.user_id, "chargeback_payment", "payments", paymentId, notes);
		return res.json({ payment: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.listSuspiciousPayments = async (_req, res) => {
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(
			`SELECT p.*, u_from.email AS from_email, u_to.email AS to_email
			 FROM payments p
			 JOIN users u_from ON u_from.user_id = p.from_user_id
			 JOIN users u_to ON u_to.user_id = p.to_user_id
			 WHERE p.is_suspicious = true OR p.chargeback_status IS NOT NULL
			 ORDER BY p.created_at DESC LIMIT 100`,
		);
		return res.json({ payments: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— Content moderation queue ———

exports.listContentFlags = async (req, res) => {
	const { status = "pending" } = req.query;
	try {
		await pool.query(`
			INSERT INTO content_flags (entity_type, entity_id, reason, status)
			SELECT 'chat_log', log_id, flagged_reason, 'pending'
			FROM chat_moderation_logs
			WHERE flagged_reason IS NOT NULL
			ON CONFLICT (entity_type, entity_id) DO NOTHING
		`).catch(() => {});

		const r = await pool.query(
			`SELECT * FROM content_flags WHERE ($1 = 'all' OR status = $1) ORDER BY created_at DESC LIMIT 200`,
			[status],
		);
		return res.json({ flags: r.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.reviewContentFlag = async (req, res) => {
	const { id } = req.params;
	const { status, notes } = req.body || {};
	const allowed = ["approved", "removed", "dismissed"];
	if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });
	try {
		const flag = await pool.query("SELECT * FROM content_flags WHERE flag_id = $1", [id]);
		if (!flag.rows.length) return res.status(404).json({ error: "Flag not found" });
		const f = flag.rows[0];

		if (status === "removed" && f.entity_type === "project") {
			await pool.query("UPDATE projects SET status = 'cancelled' WHERE project_id = $1", [f.entity_id]);
		}

		const r = await pool.query(
			`UPDATE content_flags SET status = $1, reviewed_by = $2, reviewed_at = CURRENT_TIMESTAMP
			 WHERE flag_id = $3 RETURNING *`,
			[status, req.user.user_id, id],
		);
		await writeAudit(req.user.user_id, "review_content_flag", "content_flags", id, notes || status);
		return res.json({ flag: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.flagProjectContent = async (req, res) => {
	const { projectId } = req.params;
	const { reason } = req.body || {};
	try {
		const r = await pool.query(
			`INSERT INTO content_flags (entity_type, entity_id, flagged_by_user_id, reason, status)
			 VALUES ('project', $1, $2, $3, 'pending')
			 ON CONFLICT (entity_type, entity_id) DO UPDATE SET reason = EXCLUDED.reason, status = 'pending'
			 RETURNING *`,
			[projectId, req.user.user_id, reason || "Flagged for review"],
		);
		return res.json({ flag: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— Reports: financial, usage, KPI ———

exports.financialReport = async (_req, res) => {
	try {
		const r = await pool.query(`
			SELECT
				COUNT(*) FILTER (WHERE status = 'completed')::int AS completed_count,
				COALESCE(SUM(amount) FILTER (WHERE status = 'completed'), 0)::numeric AS gross_volume,
				COALESCE(SUM(platform_fee) FILTER (WHERE status = 'completed'), 0)::numeric AS platform_revenue,
				COALESCE(SUM(amount) FILTER (WHERE status = 'refunded'), 0)::numeric AS refunded_volume,
				COUNT(*) FILTER (WHERE is_suspicious = true)::int AS suspicious_count,
				COUNT(*) FILTER (WHERE chargeback_status IS NOT NULL)::int AS chargeback_count
			FROM payments
		`);
		const byType = await pool.query(`
			SELECT reference_type, COUNT(*)::int AS count, COALESCE(SUM(amount),0)::numeric AS volume
			FROM payments WHERE status = 'completed'
			GROUP BY reference_type
		`);
		return res.json({ summary: r.rows[0], by_reference_type: byType.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.usageReport = async (req, res) => {
	const days = Math.min(365, Math.max(1, parseInt(req.query.days, 10) || 30));
	try {
		const r = await pool.query(
			`SELECT
				(SELECT COUNT(*)::int FROM users WHERE created_at >= NOW() - ($1 || ' days')::interval) AS new_users,
				(SELECT COUNT(*)::int FROM projects WHERE created_at >= NOW() - ($1 || ' days')::interval) AS new_projects,
				(SELECT COUNT(*)::int FROM investment_requests WHERE created_at >= NOW() - ($1 || ' days')::interval) AS new_funding_requests,
				(SELECT COUNT(*)::int FROM mentorship_sessions WHERE created_at >= NOW() - ($1 || ' days')::interval) AS new_sessions,
				(SELECT COUNT(*)::int FROM auth_login_attempts WHERE created_at >= NOW() - ($1 || ' days')::interval) AS login_attempts`,
			[days],
		);
		return res.json({ period_days: days, usage: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.kpiReport = async (_req, res) => {
	try {
		const r = await pool.query(`
			SELECT
				(SELECT COUNT(*)::int FROM users) AS total_users,
				(SELECT COUNT(*)::int FROM users WHERE is_approved = true AND is_active = true) AS active_verified_users,
				(SELECT COUNT(*)::int FROM startups) AS total_startups,
				(SELECT COUNT(*)::int FROM investments) AS total_investments,
				(SELECT COUNT(*)::int FROM payments WHERE status = 'completed') AS completed_payments,
				(SELECT COALESCE(SUM(platform_fee),0)::numeric FROM payments WHERE status = 'completed') AS total_platform_revenue
		`);
		return res.json({ kpis: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

// ——— Maintenance: backup, recovery, errors ———

exports.getBackupStatus = async (_req, res) => {
	try {
		await ensureBackupLogSchema();
		const r = await pool.query(
			`SELECT setting_value FROM platform_settings WHERE setting_key = 'backup_metadata'`,
		);
		const logs = await pool.query(
			`SELECT backup_log_id, status, file_name, file_size_bytes, started_at, completed_at, error_message, created_by
			 FROM backup_logs
			 ORDER BY started_at DESC
			 LIMIT 20`,
		);
		const meta = r.rows[0]?.setting_value || {
			last_backup_at: null,
			last_backup_status: "not_configured",
			storage: "manual",
		};
		return res.json({ backup: meta, logs: logs.rows });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.releaseEscrowPayment = async (req, res) => {
	const { paymentId } = req.params;
	const { notes } = req.body || {};
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(
			`UPDATE payments
			 SET escrow_status = 'released',
			     escrow_released_at = CURRENT_TIMESTAMP,
			     admin_notes = COALESCE($1, admin_notes),
			     updated_at = CURRENT_TIMESTAMP
			 WHERE payment_id = $2 AND status = 'completed' AND escrow_status IN ('held','authorized')
			 RETURNING *`,
			[notes, paymentId],
		);
		if (!r.rows.length) {
			return res.status(400).json({ error: "Payment not found or escrow cannot be released" });
		}
		await writeAudit(req.user.user_id, "release_escrow_payment", "payments", paymentId, notes);
		return res.json({ payment: r.rows[0], message: "Escrow released" });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.updatePaymentDisputeStatus = async (req, res) => {
	const { paymentId } = req.params;
	const { type = "refund", status, notes = "", provider_reference = "" } = req.body || {};
	const allowedTypes = ["refund", "chargeback"];
	const allowedStatuses = ["requested", "under_review", "provider_pending", "approved", "rejected", "completed", "failed"];
	if (!allowedTypes.includes(type) || !allowedStatuses.includes(status)) {
		return res.status(400).json({ error: "Invalid dispute type or status" });
	}
	try {
		await ensurePaymentReviewSchema();
		const fields = type === "refund"
			? { column: "refund_status", finalStatus: "refunded" }
			: { column: "chargeback_status", finalStatus: "chargeback" };
		const paymentStatus = type === "refund" && status === "completed" ? "refunded" : null;
		const update = await pool.query(
			`UPDATE payments
			 SET ${fields.column} = $1,
			     status = COALESCE($2, status),
			     provider_action_status = $3,
			     provider_action_reference = COALESCE($4, provider_action_reference),
			     escrow_status = CASE
			       WHEN $5 = 'refund' AND $1 = 'completed' THEN 'refunded'
			       WHEN $5 = 'chargeback' AND $1 IN ('requested','under_review','provider_pending') THEN 'disputed'
			       ELSE escrow_status
			     END,
			     admin_notes = COALESCE(NULLIF($6, ''), admin_notes),
			     updated_at = CURRENT_TIMESTAMP
			 WHERE payment_id = $7
			 RETURNING *`,
			[status, paymentStatus, status, provider_reference || null, type, notes, paymentId],
		);
		if (!update.rowCount) return res.status(404).json({ error: "Payment not found" });
		await pool.query(
			`INSERT INTO payment_dispute_logs (payment_id, action, status, notes, created_by)
			 VALUES ($1, $2, $3, $4, $5)`,
			[paymentId, type, status, notes, req.user.user_id],
		);
		await writeAudit(req.user.user_id, `payment_${type}_${status}`, "payments", paymentId, notes);
		return res.json({ payment: update.rows[0], message: `${type} status updated` });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.runPaymentFraudScan = async (req, res) => {
	try {
		await ensurePaymentReviewSchema();
		const payments = await pool.query(
			`SELECT payment_id, from_user_id, to_user_id, amount, status, created_at
			 FROM payments
			 WHERE created_at >= NOW() - INTERVAL '90 days'
			 ORDER BY created_at DESC`,
		);
		let flagged = 0;
		for (const payment of payments.rows) {
			const recent = await pool.query(
				`SELECT COUNT(*)::int AS count FROM payments
				 WHERE from_user_id = $1 AND created_at BETWEEN $2::timestamptz - INTERVAL '1 hour' AND $2::timestamptz + INTERVAL '1 hour'`,
				[payment.from_user_id, payment.created_at],
			);
			const receiver = await pool.query(
				`SELECT COUNT(*)::int AS count FROM payments
				 WHERE to_user_id = $1 AND created_at BETWEEN $2::timestamptz - INTERVAL '1 day' AND $2::timestamptz + INTERVAL '1 day'`,
				[payment.to_user_id, payment.created_at],
			);
			const flags = buildAdminFraudFlags(payment, recent.rows[0]?.count || 0, receiver.rows[0]?.count || 0);
			const score = fraudScore(flags);
			if (flags.length) flagged += 1;
			await pool.query(
				`UPDATE payments
				 SET fraud_flags = $1::jsonb,
				     risk_score = $2,
				     is_suspicious = CASE WHEN $2 >= 50 THEN true ELSE is_suspicious END,
				     updated_at = CURRENT_TIMESTAMP
				 WHERE payment_id = $3`,
				[JSON.stringify(flags), score, payment.payment_id],
			);
		}
		await writeAudit(req.user.user_id, "run_payment_fraud_scan", "payments", null, `${flagged} flagged`);
		return res.json({ message: "Fraud scan completed", scanned: payments.rowCount, flagged });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.triggerBackup = async (req, res) => {
	const admin = req.user;
	let logId = null;
	try {
		await ensureBackupLogSchema();
		await fs.mkdir(BACKUP_DIR, { recursive: true });
		const log = await pool.query(
			`INSERT INTO backup_logs (status, created_by)
			 VALUES ('started', $1)
			 RETURNING backup_log_id`,
			[admin.user_id],
		);
		logId = log.rows[0].backup_log_id;

		const snapshot = await createDatabaseSnapshot();
		const fileName = `startupconnect-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
		const filePath = path.join(BACKUP_DIR, fileName);
		await fs.writeFile(filePath, JSON.stringify(snapshot, null, 2));
		const stat = await fs.stat(filePath);

		const backupLog = await pool.query(
			`UPDATE backup_logs
			 SET status = 'completed',
			     file_name = $1,
			     file_path = $2,
			     file_size_bytes = $3,
			     completed_at = CURRENT_TIMESTAMP
			 WHERE backup_log_id = $4
			 RETURNING backup_log_id, status, file_name, file_size_bytes, started_at, completed_at`,
			[fileName, filePath, stat.size, logId],
		);

		const meta = {
			last_backup_at: new Date().toISOString(),
			last_backup_status: "completed",
			storage: "server_json_snapshot",
			triggered_by: admin.user_id,
			backup_log_id: logId,
			file_name: fileName,
			file_size_bytes: stat.size,
		};
		await pool.query(
			`INSERT INTO platform_settings (setting_key, setting_value, updated_by)
			 VALUES ('backup_metadata', $1::jsonb, $2)
			 ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_by = EXCLUDED.updated_by`,
			[JSON.stringify(meta), admin.user_id],
		);
		await writeAudit(admin.user_id, "trigger_backup", "backup_logs", logId, "database JSON snapshot", meta);
		return res.json({ message: "Backup created", backup: meta, log: backupLog.rows[0] });
	} catch (err) {
		if (logId) {
			await pool.query(
				`UPDATE backup_logs
				 SET status = 'failed', error_message = $1, completed_at = CURRENT_TIMESTAMP
				 WHERE backup_log_id = $2`,
				[err.message, logId],
			).catch(() => {});
		}
		return res.status(500).json({ error: err.message });
	}
};

exports.downloadBackup = async (req, res) => {
	try {
		await ensureBackupLogSchema();
		const id = Number(req.params.backupId);
		if (!Number.isInteger(id) || id <= 0) {
			return res.status(400).json({ error: "Invalid backup id" });
		}

		const backup = await pool.query(
			`SELECT backup_log_id, status, file_name, file_path
			 FROM backup_logs
			 WHERE backup_log_id = $1 AND status = 'completed'`,
			[id],
		);
		if (!backup.rowCount) {
			return res.status(404).json({ error: "Backup file not found" });
		}

		const row = backup.rows[0];
		const fileName = safeBackupFileName(row.file_name);
		const resolved = path.resolve(row.file_path || path.join(BACKUP_DIR, fileName));
		const backupRoot = path.resolve(BACKUP_DIR);
		if (!resolved.startsWith(backupRoot)) {
			return res.status(403).json({ error: "Backup path is not allowed" });
		}

		return res.download(resolved, fileName);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.restoreBackup = async (req, res) => {
	const admin = req.user;
	const { confirm } = req.body || {};
	if (confirm !== "RESTORE_BACKUP") {
		return res.status(400).json({ error: "Confirmation required: RESTORE_BACKUP" });
	}

	const client = await pool.connect();
	let backupId = null;
	try {
		await ensureBackupLogSchema();
		backupId = Number(req.params.backupId);
		if (!Number.isInteger(backupId) || backupId <= 0) {
			return res.status(400).json({ error: "Invalid backup id" });
		}

		const backup = await pool.query(
			`SELECT backup_log_id, status, file_name, file_path
			 FROM backup_logs
			 WHERE backup_log_id = $1 AND status = 'completed'`,
			[backupId],
		);
		if (!backup.rowCount) return res.status(404).json({ error: "Backup file not found" });

		const row = backup.rows[0];
		const resolved = path.resolve(row.file_path || path.join(BACKUP_DIR, safeBackupFileName(row.file_name)));
		const backupRoot = path.resolve(BACKUP_DIR);
		if (!resolved.startsWith(backupRoot)) {
			return res.status(403).json({ error: "Backup path is not allowed" });
		}

		const raw = await fs.readFile(resolved, "utf8");
		const snapshot = JSON.parse(raw);
		if (snapshot?.format !== "startupconnect-json-backup-v1" || !snapshot.tables || typeof snapshot.tables !== "object") {
			return res.status(400).json({ error: "Invalid backup snapshot" });
		}

		await pool.query(
			`UPDATE backup_logs
			 SET restore_status = 'running', restore_started_at = CURRENT_TIMESTAMP, restored_by = $2, restore_error_message = NULL
			 WHERE backup_log_id = $1`,
			[backupId, admin.user_id],
		);

		const tableNames = Object.keys(snapshot.tables).filter((table) => table !== "backup_logs");
		await client.query("BEGIN");
		if (tableNames.length) {
			const truncateList = tableNames.map((table) => `"${table.replace(/"/g, '""')}"`).join(", ");
			await client.query(`TRUNCATE ${truncateList} RESTART IDENTITY CASCADE`);
		}

		for (const table of tableNames) {
			const rows = Array.isArray(snapshot.tables[table]) ? snapshot.tables[table] : [];
			for (const record of rows) {
				const columns = Object.keys(record);
				if (!columns.length) continue;
				const names = columns.map((column) => `"${column.replace(/"/g, '""')}"`).join(", ");
				const placeholders = columns.map((_, index) => `$${index + 1}`).join(", ");
				await client.query(
					`INSERT INTO "${table.replace(/"/g, '""')}" (${names}) VALUES (${placeholders})`,
					columns.map((column) => record[column]),
				);
			}
		}
		await client.query("COMMIT");

		await pool.query(
			`UPDATE backup_logs
			 SET restore_status = 'completed', restore_completed_at = CURRENT_TIMESTAMP
			 WHERE backup_log_id = $1`,
			[backupId],
		);
		await writeAudit(admin.user_id, "restore_backup", "backup_logs", backupId, "database JSON restore");
		return res.json({ message: "Backup restored", restored_tables: tableNames.length });
	} catch (err) {
		await client.query("ROLLBACK").catch(() => {});
		if (backupId) {
			await pool.query(
				`UPDATE backup_logs
				 SET restore_status = 'failed', restore_completed_at = CURRENT_TIMESTAMP, restore_error_message = $2
				 WHERE backup_log_id = $1`,
				[backupId, err.message],
			).catch(() => {});
		}
		return res.status(500).json({ error: err.message });
	} finally {
		client.release();
	}
};

exports.listErrorLogs = async (req, res) => {
	const { limit = 100 } = req.query;
	try {
		const errors = await pool.query(
			`SELECT log_id, source, level, message, metadata, created_at
			 FROM system_error_logs ORDER BY created_at DESC LIMIT $1`,
			[limit],
		);
		const security = await pool.query(
			`SELECT event_id, event_type AS source, severity AS level, details AS message, created_at
			 FROM security_events WHERE severity IN ('high', 'medium')
			 ORDER BY created_at DESC LIMIT $1`,
			[Math.min(50, limit)],
		);
		return res.json({
			error_logs: errors.rows,
			security_alerts: security.rows,
		});
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.logSystemError = async (req, res) => {
	const { source, level = "error", message, metadata } = req.body || {};
	if (!message) return res.status(400).json({ error: "message required" });
	try {
		const r = await pool.query(
			`INSERT INTO system_error_logs (source, level, message, metadata)
			 VALUES ($1,$2,$3,$4::jsonb) RETURNING *`,
			[source || "admin", level, message, metadata ? JSON.stringify(metadata) : null],
		);
		return res.status(201).json({ log: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};

exports.getFraudSummary = async (_req, res) => {
	try {
		await ensurePaymentReviewSchema();
		const r = await pool.query(`
			SELECT
				(SELECT COUNT(*)::int FROM payments WHERE is_suspicious = true) AS suspicious_payments,
				(SELECT COUNT(*)::int FROM payments WHERE jsonb_array_length(fraud_flags) > 0) AS payments_with_fraud_flags,
				(SELECT COALESCE(AVG(risk_score), 0)::numeric(10,2) FROM payments WHERE created_at >= NOW() - INTERVAL '30 days') AS avg_payment_risk_score,
				(SELECT COUNT(*)::int FROM payments WHERE escrow_status = 'disputed') AS disputed_escrow_payments,
				(SELECT COUNT(*)::int FROM payments WHERE chargeback_status IS NOT NULL) AS chargebacks,
				(SELECT COUNT(*)::int FROM security_events WHERE severity IN ('high','critical') AND created_at >= NOW() - INTERVAL '7 days') AS critical_security_events,
				(SELECT COUNT(*)::int FROM chat_user_violations WHERE violation_count >= 3) AS repeat_offenders,
				(SELECT COUNT(*)::int FROM investment_disputes WHERE status = 'open') AS open_investment_disputes
		`);
		return res.json({ fraud: r.rows[0] });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
};
