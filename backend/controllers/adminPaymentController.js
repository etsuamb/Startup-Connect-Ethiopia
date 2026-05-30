const pool = require("../config/db");

async function ensurePaymentReviewSchema() {
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS escrow_status VARCHAR(30) NOT NULL DEFAULT 'not_applicable'");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS fraud_flags JSONB NOT NULL DEFAULT '[]'::jsonb");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS is_suspicious BOOLEAN NOT NULL DEFAULT false");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS refund_status VARCHAR(30)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS chargeback_status VARCHAR(30)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS risk_score INTEGER NOT NULL DEFAULT 0");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_action_status VARCHAR(40)");
}

exports.getAllPayments = async (req, res) => {
	try {
		await ensurePaymentReviewSchema();
		const { status, payment_method, page = 1, limit = 50 } = req.query;
		const offset = (Math.max(1, page) - 1) * limit;

		let query = `
			SELECT p.payment_id, p.amount, p.platform_fee, p.net_amount, p.currency, 
			       p.payment_method, p.status, p.reference_type, p.tx_ref, p.created_at,
			       p.escrow_status, p.fraud_flags, p.is_suspicious, p.refund_status, p.chargeback_status,
			       p.risk_score, p.provider_action_status,
			       u_from.first_name AS from_first_name, u_from.last_name AS from_last_name,
			       u_to.first_name AS to_first_name, u_to.last_name AS to_last_name
			FROM payments p
			JOIN users u_from ON u_from.user_id = p.from_user_id
			JOIN users u_to ON u_to.user_id = p.to_user_id
			WHERE 1=1
		`;
		const params = [];
		let paramIndex = 1;

		if (status) {
			query += ` AND p.status = $${paramIndex++}`;
			params.push(status);
		}
		if (payment_method) {
			query += ` AND p.payment_method = $${paramIndex++}`;
			params.push(payment_method);
		}

		// Count total before pagination
		const countResult = await pool.query(`SELECT COUNT(*) FROM (${query}) AS c`, params);
		const total = parseInt(countResult.rows[0].count, 10);

		query += ` ORDER BY p.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
		params.push(limit, offset);

		const result = await pool.query(query, params);

		res.json({
			total,
			page: Number(page),
			limit: Number(limit),
			totalPages: Math.ceil(total / limit),
			payments: result.rows
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.getPaymentStats = async (req, res) => {
	try {
		await ensurePaymentReviewSchema();
		const statsQuery = `
			SELECT 
				COUNT(*) as total_transactions,
				SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as successful_transactions,
				SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_volume,
				SUM(CASE WHEN status = 'completed' THEN platform_fee ELSE 0 END) as total_revenue,
				SUM(CASE WHEN escrow_status = 'held' THEN 1 ELSE 0 END) as escrow_held,
				SUM(CASE WHEN is_suspicious = true THEN 1 ELSE 0 END) as suspicious_transactions,
				COALESCE(AVG(risk_score), 0)::numeric(10,2) as avg_risk_score
			FROM payments
		`;
		const result = await pool.query(statsQuery);
		
		res.json({
			stats: {
				total_transactions: parseInt(result.rows[0].total_transactions, 10) || 0,
				successful_transactions: parseInt(result.rows[0].successful_transactions, 10) || 0,
				total_volume: parseFloat(result.rows[0].total_volume) || 0,
				total_revenue: parseFloat(result.rows[0].total_revenue) || 0,
				escrow_held: parseInt(result.rows[0].escrow_held, 10) || 0,
				suspicious_transactions: parseInt(result.rows[0].suspicious_transactions, 10) || 0,
				avg_risk_score: parseFloat(result.rows[0].avg_risk_score) || 0
			}
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
