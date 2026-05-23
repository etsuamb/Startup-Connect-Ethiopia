const crypto = require("crypto");
const pool = require("../config/db");

const CHAPA_BASE_URL = process.env.CHAPA_BASE_URL || "https://api.chapa.co/v1";
const CHAPA_PUBLIC_KEY = process.env.CHAPA_PUBLIC_KEY;
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_RETURN_URL = process.env.CHAPA_RETURN_URL || "http://localhost:3000";
const CHAPA_CALLBACK_URL = process.env.CHAPA_CALLBACK_URL;

function requireChapaConfig() {
	if (!CHAPA_SECRET_KEY || !CHAPA_PUBLIC_KEY) {
		const err = new Error("CHAPA_PUBLIC_KEY and CHAPA_SECRET_KEY must be configured");
		err.status = 500;
		throw err;
	}
}

function makeTxRef(userId) {
	return `sc-${userId}-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
}

function frontendReturnUrl(txRef) {
	const base = CHAPA_RETURN_URL.replace(/\/$/, "");
	return `${base}/investor/payment/completed?tx_ref=${encodeURIComponent(txRef)}`;
}

function normalizeChapaPhone(value) {
	const digits = String(value || "").replace(/\D/g, "");
	if (/^0[79]\d{8}$/.test(digits)) return digits;
	if (/^251[79]\d{8}$/.test(digits)) return `0${digits.slice(3)}`;
	return null;
}

async function ensurePaymentGatewayColumns() {
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS tx_ref VARCHAR(120)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS checkout_url TEXT");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_reference VARCHAR(180)");
	await pool.query("ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP");
	await pool.query("CREATE UNIQUE INDEX IF NOT EXISTS payments_tx_ref_uidx ON payments(tx_ref) WHERE tx_ref IS NOT NULL");
}

async function getInvestorId(userId) {
	const result = await pool.query("SELECT investor_id FROM investors WHERE user_id = $1", [userId]);
	return result.rows[0]?.investor_id || null;
}

async function getPayableOffer(client, userId, offerId) {
	const investorId = await getInvestorId(userId);
	if (!investorId) {
		const err = new Error("Investor profile not found");
		err.status = 404;
		throw err;
	}

	const offerRes = await client.query(
		`SELECT ir.investment_request_id, ir.requested_amount, ir.status,
				s.startup_name, s.user_id AS startup_user_id,
				u.first_name, u.last_name, u.email, u.phone_number
		 FROM investment_requests ir
		 JOIN startups s ON s.startup_id = ir.startup_id
		 JOIN investors inv ON inv.investor_id = ir.investor_id
		 JOIN users u ON u.user_id = inv.user_id
		 WHERE ir.investment_request_id = $1 AND ir.investor_id = $2`,
		[offerId, investorId],
	);

	if (offerRes.rows.length === 0) {
		const err = new Error("Funding offer not found");
		err.status = 404;
		throw err;
	}

	const offer = offerRes.rows[0];
	if (offer.status !== "approved") {
		const err = new Error("Only accepted offers can be paid");
		err.status = 409;
		throw err;
	}

	return offer;
}

exports.getInvestmentPaymentItems = async (req, res) => {
	try {
		await ensurePaymentGatewayColumns();
		const investorId = await getInvestorId(req.user.user_id);
		if (!investorId) return res.status(404).json({ message: "Investor profile not found" });

		const result = await pool.query(
			`SELECT ir.investment_request_id, ir.requested_amount, ir.status AS offer_status, ir.created_at,
					s.startup_id, s.startup_name, s.industry, s.business_stage, s.user_id AS startup_user_id,
					p.project_title,
					pay.payment_id, pay.status AS payment_status, pay.tx_ref, pay.checkout_url, pay.created_at AS payment_created_at
			 FROM investment_requests ir
			 JOIN startups s ON s.startup_id = ir.startup_id
			 JOIN projects p ON p.project_id = ir.project_id
			 LEFT JOIN LATERAL (
				SELECT payment_id, status, tx_ref, checkout_url, created_at
				FROM payments
				WHERE reference_type = 'investment_request'
				  AND reference_id = ir.investment_request_id
				  AND from_user_id = $2
				ORDER BY created_at DESC
				LIMIT 1
			 ) pay ON true
			 WHERE ir.investor_id = $1
			   AND ir.status IN ('approved')
			 ORDER BY ir.created_at DESC`,
			[investorId, req.user.user_id],
		);

		res.json({ payments: result.rows });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

exports.initializeChapaPayment = async (req, res) => {
	const client = await pool.connect();
	try {
		requireChapaConfig();
		await ensurePaymentGatewayColumns();

		const offerId = Number.parseInt(req.body.offer_id || req.body.investment_request_id, 10);
		if (!Number.isInteger(offerId)) {
			return res.status(400).json({ error: "offer_id is required" });
		}

		const offer = await getPayableOffer(client, req.user.user_id, offerId);

		const txRef = makeTxRef(req.user.user_id);
		const amount = String(Math.round(Number(offer.requested_amount)));
		const currency = "ETB";
		const returnUrl = frontendReturnUrl(txRef);
		const phoneNumber = normalizeChapaPhone(offer.phone_number);

		const chapaPayload = {
			amount,
			currency,
			email: offer.email,
			first_name: offer.first_name || "Investor",
			last_name: offer.last_name || "User",
			tx_ref: txRef,
			return_url: returnUrl,
			customization: { title: "StartupConnect" },
		};
		if (phoneNumber) chapaPayload.phone_number = phoneNumber;
		if (CHAPA_CALLBACK_URL) chapaPayload.callback_url = CHAPA_CALLBACK_URL;

		const chapaRes = await fetch(`${CHAPA_BASE_URL}/transaction/initialize`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(chapaPayload),
		});
		const chapaData = await chapaRes.json().catch(() => ({}));
		if (!chapaRes.ok || chapaData.status !== "success") {
			return res.status(502).json({
				error: "Chapa rejected checkout initialization",
				chapa_status: chapaRes.status,
				chapa_message: chapaData.message || null,
				details: chapaData,
			});
		}

		await client.query("BEGIN");
		const paymentRes = await client.query(
			`INSERT INTO payments (
				from_user_id, to_user_id, amount, currency, payment_method, status,
				reference_type, reference_id, tx_ref, checkout_url, updated_at
			 )
			 VALUES ($1, $2, $3, $4, 'chapa', 'pending', 'investment_request', $5, $6, $7, CURRENT_TIMESTAMP)
			 RETURNING *`,
			[
				req.user.user_id,
				offer.startup_user_id,
				amount,
				currency,
				offer.investment_request_id,
				txRef,
				chapaData.data?.checkout_url,
			],
		);
		await client.query("COMMIT");

		res.status(201).json({
			message: "Chapa checkout initialized",
			payment: paymentRes.rows[0],
			checkout_url: chapaData.data?.checkout_url,
			tx_ref: txRef,
		});
	} catch (err) {
		await client.query("ROLLBACK").catch(() => {});
		res.status(err.status || 500).json({ error: err.message });
	} finally {
		client.release();
	}
};

exports.createChapaHostedPayment = async (req, res) => {
	const client = await pool.connect();
	try {
		requireChapaConfig();
		await ensurePaymentGatewayColumns();

		const offerId = Number.parseInt(req.body.offer_id || req.body.investment_request_id, 10);
		if (!Number.isInteger(offerId)) {
			return res.status(400).json({ error: "offer_id is required" });
		}

		const offer = await getPayableOffer(client, req.user.user_id, offerId);
		const txRef = makeTxRef(req.user.user_id);
		const amount = String(Math.round(Number(offer.requested_amount)));
		const currency = "ETB";
		const returnUrl = frontendReturnUrl(txRef);
		const phoneNumber = normalizeChapaPhone(offer.phone_number);

		await client.query("BEGIN");
		const paymentRes = await client.query(
			`INSERT INTO payments (
				from_user_id, to_user_id, amount, currency, payment_method, status,
				reference_type, reference_id, tx_ref, checkout_url, updated_at
			 )
			 VALUES ($1, $2, $3, $4, 'chapa_hosted', 'pending', 'investment_request', $5, $6, $7, CURRENT_TIMESTAMP)
			 RETURNING *`,
			[
				req.user.user_id,
				offer.startup_user_id,
				amount,
				currency,
				offer.investment_request_id,
				txRef,
				`${CHAPA_BASE_URL}/hosted/pay`,
			],
		);
		await client.query("COMMIT");

		const fields = {
			public_key: CHAPA_PUBLIC_KEY,
			tx_ref: txRef,
			amount,
			currency,
			email: offer.email,
			first_name: offer.first_name || "Investor",
			last_name: offer.last_name || "User",
			title: "StartupConnect",
			description: `Payment for ${offer.startup_name}`,
			return_url: returnUrl,
		};
		if (CHAPA_CALLBACK_URL) fields.callback_url = CHAPA_CALLBACK_URL;
		if (phoneNumber) fields.phone_number = phoneNumber;

		res.status(201).json({
			message: "Chapa hosted payment prepared",
			payment: paymentRes.rows[0],
			form_action: `${CHAPA_BASE_URL}/hosted/pay`,
			form_fields: fields,
			tx_ref: txRef,
		});
	} catch (err) {
		await client.query("ROLLBACK").catch(() => {});
		res.status(err.status || 500).json({ error: err.message });
	} finally {
		client.release();
	}
};

async function verifyAndUpdatePayment(txRef) {
	requireChapaConfig();
	await ensurePaymentGatewayColumns();

	const chapaRes = await fetch(`${CHAPA_BASE_URL}/transaction/verify/${encodeURIComponent(txRef)}`, {
		headers: { Authorization: `Bearer ${CHAPA_SECRET_KEY}` },
	});
	const chapaData = await chapaRes.json().catch(() => ({}));
	if (!chapaRes.ok) {
		const err = new Error(chapaData.message || "Unable to verify Chapa payment");
		err.status = 502;
		err.details = chapaData;
		throw err;
	}

	const status = chapaData.status === "success" && chapaData.data?.status === "success"
		? "completed"
		: chapaData.data?.status === "failed"
			? "failed"
			: "pending";

	const updated = await pool.query(
		`UPDATE payments
		 SET status = $1, provider_reference = COALESCE($2, provider_reference), updated_at = CURRENT_TIMESTAMP
		 WHERE tx_ref = $3
		 RETURNING *`,
		[status, chapaData.data?.reference || chapaData.data?.tx_ref || null, txRef],
	);

	return { payment: updated.rows[0] || null, chapa: chapaData };
}

exports.verifyChapaPayment = async (req, res) => {
	try {
		const txRef = req.params.txRef || req.query.tx_ref;
		if (!txRef) return res.status(400).json({ error: "tx_ref is required" });
		const result = await verifyAndUpdatePayment(txRef);
		if (!result.payment) return res.status(404).json({ error: "Payment not found" });
		res.json(result);
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message, details: err.details });
	}
};

exports.handleChapaWebhook = async (req, res) => {
	try {
		const txRef = req.body?.tx_ref || req.body?.trx_ref || req.query?.tx_ref;
		if (txRef) {
			await verifyAndUpdatePayment(txRef);
		}
		res.json({ received: true });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};
