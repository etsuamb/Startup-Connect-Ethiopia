const nodemailer = require("nodemailer");

const IS_RENDER = Boolean(process.env.RENDER);
const RESEND_API_KEY = String(process.env.RESEND_API_KEY || "").trim();
const BREVO_API_KEY_RAW = String(process.env.BREVO_API_KEY || "").trim();
const BREVO_SMTP_KEY = String(process.env.BREVO_SMTP_KEY || "").trim();

const BREVO_HTTP_API_KEY = BREVO_API_KEY_RAW.startsWith("xkeysib-") ? BREVO_API_KEY_RAW : "";
const BREVO_SMTP_PASSWORD =
	BREVO_SMTP_KEY ||
	(BREVO_API_KEY_RAW.startsWith("xsmtpsib-") ? BREVO_API_KEY_RAW : "") ||
	"";

class MailDeliveryError extends Error {
	constructor(message, code, details = null) {
		super(message);
		this.name = "MailDeliveryError";
		this.code = code;
		this.details = details;
	}
}

function readGenericSmtpConfig() {
	const host = String(process.env.SMTP_HOST || "").trim();
	const port = Number(process.env.SMTP_PORT);
	const user = String(process.env.SMTP_USER || "").trim();
	const pass = String(process.env.SMTP_PASS || "").replace(/\s+/g, "");
	const from = String(process.env.FROM_EMAIL || user || "no-reply@connectstartup.local").trim();

	if (!host || !port || !user || !pass) {
		return null;
	}

	return { host, port, user, pass, from };
}

function readBrevoSmtpConfig() {
	const user = String(process.env.BREVO_SMTP_USER || "").trim();
	const pass = BREVO_SMTP_PASSWORD.replace(/\s+/g, "");
	const from = String(
		process.env.BREVO_FROM_EMAIL || process.env.FROM_EMAIL || "",
	).trim();

	if (!user || !pass) {
		return null;
	}

	return {
		host: String(process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com").trim(),
		port: Number(process.env.BREVO_SMTP_PORT || 587),
		user,
		pass,
		from: from || user,
	};
}

function formatResendFrom() {
	const raw = String(
		process.env.RESEND_FROM_EMAIL || process.env.FROM_EMAIL || "onboarding@resend.dev",
	).trim();
	if (raw.includes("<")) return raw;
	return `StartupConnect <${raw}>`;
}

function readBrevoSender() {
	const email = String(
		process.env.BREVO_FROM_EMAIL || process.env.FROM_EMAIL || "",
	).trim();
	const name = String(process.env.BREVO_FROM_NAME || "StartupConnect").trim();
	if (!email || email.includes("@smtp-brevo.com")) {
		return null;
	}
	return { email, name };
}

function createTransporter(config) {
	return nodemailer.createTransport({
		host: config.host,
		port: config.port,
		secure: config.port === 465,
		requireTLS: config.port === 587,
		auth: {
			user: config.user,
			pass: config.pass,
		},
		connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT_MS) || 10000,
		greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT_MS) || 10000,
		socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT_MS) || 15000,
		pool: false,
	});
}

const brevoSmtpConfig = readBrevoSmtpConfig();
const genericSmtpConfig = readGenericSmtpConfig();
const brevoTransporter = brevoSmtpConfig ? createTransporter(brevoSmtpConfig) : null;
const genericTransporter =
	genericSmtpConfig && !/brevo\.com/i.test(genericSmtpConfig.host)
		? createTransporter(genericSmtpConfig)
		: null;

function logMailFallback(to, subject, text, html, reason) {
	const body = text || (html ? html.replace(/<[^>]+>/g, " ") : "");
	console.warn(`[mail-fallback] ${reason || "delivery failed"} to=${to} subject=${subject}`);
	if (body) {
		console.warn("[mail-fallback] body:", body.slice(0, 2000));
	}
}

function parseResendError(message) {
	const text = String(message || "");
	if (/only send testing emails to your own email address/i.test(text)) {
		const match = text.match(/email address \(([^)]+)\)/i);
		return new MailDeliveryError(
			match
				? `Resend test mode only allows sending to ${match[1]}. Register with that email for testing, verify a domain at resend.com/domains, or use Brevo with a verified sender email.`
				: "Resend test mode only allows sending to your Resend signup email until you verify a domain.",
			"RESEND_SANDBOX_ONLY",
			{ allowedEmail: match?.[1] || null },
		);
	}
	return new MailDeliveryError(text || "Resend delivery failed", "RESEND_FAILED");
}

function parseBrevoApiKeyMisconfig() {
	if (BREVO_API_KEY_RAW.startsWith("xsmtpsib-") && !process.env.BREVO_SMTP_USER) {
		return new MailDeliveryError(
			"You put a Brevo SMTP key in BREVO_API_KEY. Set BREVO_SMTP_USER=your_login@smtp-brevo.com and keep the xsmtpsib key in BREVO_API_KEY or BREVO_SMTP_KEY.",
			"BREVO_MISCONFIGURED",
		);
	}
	if (BREVO_API_KEY_RAW && !BREVO_HTTP_API_KEY && !BREVO_SMTP_PASSWORD) {
		return new MailDeliveryError(
			"BREVO_API_KEY must start with xkeysib- (HTTP API key). SMTP keys start with xsmtpsib- and belong in BREVO_SMTP_KEY.",
			"BREVO_MISCONFIGURED",
		);
	}
	return null;
}

async function sendViaBrevoApi(to, subject, plainText, html) {
	if (!BREVO_HTTP_API_KEY) {
		return null;
	}

	const sender = readBrevoSender();
	if (!sender) {
		throw new MailDeliveryError(
			"BREVO_FROM_EMAIL must be your verified sender Gmail, not the @smtp-brevo.com login.",
			"BREVO_MISCONFIGURED",
		);
	}

	const response = await fetch("https://api.brevo.com/v3/smtp/email", {
		method: "POST",
		headers: {
			"api-key": BREVO_HTTP_API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			sender,
			to: [{ email: to }],
			subject,
			textContent: plainText,
			htmlContent: html,
		}),
	});

	const payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		const message = payload?.message || payload?.error || `Brevo HTTP ${response.status}`;
		if (/key not found|unauthorized|invalid api key/i.test(String(message))) {
			throw new MailDeliveryError(
				`${message}. Use an HTTP API key starting with xkeysib- from Brevo -> Settings -> SMTP & API -> API Keys. SMTP keys (xsmtpsib-) will not work here.`,
				"BREVO_INVALID_API_KEY",
			);
		}
		if (/sender.*not valid|sender.*not verified|invalid sender/i.test(String(message))) {
			throw new MailDeliveryError(
				`${message}. Verify ${sender.email} as a sender in Brevo -> Settings -> Senders.`,
				"BREVO_SENDER_NOT_VERIFIED",
				{ senderEmail: sender.email },
			);
		}
		throw new MailDeliveryError(message, "BREVO_FAILED");
	}

	return { delivered: true, provider: "brevo-api", id: payload.messageId || null };
}

async function sendViaBrevoSmtp(to, subject, plainText, html) {
	if (!brevoTransporter || !brevoSmtpConfig) {
		return null;
	}

	const fromEmail = brevoSmtpConfig.from;
	const fromName = String(process.env.BREVO_FROM_NAME || "StartupConnect").trim();
	const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

	const info = await brevoTransporter.sendMail({
		from,
		to,
		subject,
		text: plainText,
		html,
	});

	return { delivered: true, provider: "brevo-smtp", messageId: info.messageId };
}

async function sendViaResend(to, subject, plainText, html) {
	if (!RESEND_API_KEY) {
		return null;
	}

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: formatResendFrom(),
			to: [to],
			subject,
			text: plainText,
			html,
		}),
	});

	const payload = await response.json().catch(() => ({}));
	if (!response.ok) {
		const message =
			payload?.message ||
			payload?.error ||
			(typeof payload === "string" ? payload : null) ||
			`Resend HTTP ${response.status}`;
		throw parseResendError(message);
	}

	return { delivered: true, provider: "resend", id: payload.id };
}

async function sendViaGenericSmtp(to, subject, plainText, html) {
	if (!genericTransporter || !genericSmtpConfig) {
		return null;
	}

	const info = await genericTransporter.sendMail({
		from: genericSmtpConfig.from,
		to,
		subject,
		text: plainText,
		html,
	});

	return { delivered: true, provider: "smtp", messageId: info.messageId };
}

function describeMailSetup() {
	if (BREVO_HTTP_API_KEY) return "Brevo HTTP API";
	if (brevoSmtpConfig) return "Brevo SMTP";
	if (RESEND_API_KEY) return "Resend API";
	if (genericSmtpConfig) {
		return IS_RENDER
			? "SMTP (Render often blocks Gmail SMTP; use Brevo SMTP or Brevo API key)"
			: "SMTP";
	}
	return "none (configure Brevo SMTP or Brevo/Resend API keys)";
}

async function sendMail(to, subject, text, html) {
	const plainText = text || (html ? html.replace(/<[^>]+>/g, " ") : "");
	const misconfig = parseBrevoApiKeyMisconfig();
	if (misconfig) {
		throw misconfig;
	}

	const errors = [];

	if (BREVO_HTTP_API_KEY) {
		try {
			return await sendViaBrevoApi(to, subject, plainText, html);
		} catch (err) {
			if (err instanceof MailDeliveryError) {
				throw err;
			}
			errors.push(`Brevo API: ${err.message || err}`);
			console.error("[mail-error] Brevo API failed:", err.message || err);
		}
	}

	if (brevoTransporter) {
		try {
			return await sendViaBrevoSmtp(to, subject, plainText, html);
		} catch (err) {
			errors.push(`Brevo SMTP: ${err.message || err}`);
			console.error("[mail-error] Brevo SMTP failed:", err.message || err);
		}
	}

	if (RESEND_API_KEY) {
		try {
			return await sendViaResend(to, subject, plainText, html);
		} catch (err) {
			if (err instanceof MailDeliveryError) {
				throw err;
			}
			errors.push(`Resend: ${err.message || err}`);
			console.error("[mail-error] Resend failed:", err.message || err);
		}
	}

	const skipGenericSmtpOnRender = IS_RENDER && !process.env.RENDER_ALLOW_SMTP;
	if (!skipGenericSmtpOnRender) {
		try {
			const smtpResult = await sendViaGenericSmtp(to, subject, plainText, html);
			if (smtpResult) {
				return smtpResult;
			}
			errors.push("Generic SMTP not configured");
		} catch (err) {
			errors.push(`SMTP: ${err.message || err}`);
			console.error("[mail-error] SMTP failed:", err.message || err);
		}
	} else if (!brevoTransporter && !BREVO_HTTP_API_KEY && !RESEND_API_KEY) {
		errors.push(
			"Render blocks most SMTP. Configure Brevo SMTP (xsmtpsib key + BREVO_SMTP_USER) or a Brevo xkeysib API key.",
		);
	}

	const reason = errors.join("; ") || "No email provider configured";
	logMailFallback(to, subject, plainText, html, reason);
	return { delivered: false, provider: null, error: reason };
}

function getMailProviderStatus() {
	return {
		render: IS_RENDER,
		brevoApiConfigured: Boolean(BREVO_HTTP_API_KEY),
		brevoSmtpConfigured: Boolean(brevoSmtpConfig),
		resendConfigured: Boolean(RESEND_API_KEY),
		genericSmtpConfigured: Boolean(genericSmtpConfig),
		activeProvider: describeMailSetup(),
		brevoSender: readBrevoSender()?.email || brevoSmtpConfig?.from || null,
		brevoSmtpUser: brevoSmtpConfig?.user || null,
		resendFrom: formatResendFrom(),
		hint:
			BREVO_API_KEY_RAW.startsWith("xsmtpsib-") && !process.env.BREVO_SMTP_USER
				? "Add BREVO_SMTP_USER=your_login@smtp-brevo.com"
				: null,
	};
}

module.exports = {
	sendMail,
	getMailProviderStatus,
	MailDeliveryError,
};
