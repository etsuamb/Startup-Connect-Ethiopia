/**
 * Regex-based contact-info detection to keep users on-platform.
 * Patterns are applied to normalized text (obfuscation-resistant).
 */

const MODERATION_WARNING =
	"For your safety and transaction protection, sharing personal contact information outside StartupConnect is not allowed.";

const VIOLATION_THRESHOLD = Number(process.env.CHAT_VIOLATION_THRESHOLD) || 3;
const VIOLATION_WINDOW_HOURS = Number(process.env.CHAT_VIOLATION_WINDOW_HOURS) || 24;

const RULES = [
	{
		name: "telegram_link",
		pattern: /\b(?:t\.me|telegram\.me|telegram\.org)\/[\w-]+/i,
	},
	{
		name: "whatsapp_link",
		pattern: /\b(?:wa\.me|api\.whatsapp\.com|chat\.whatsapp\.com)(?:\/[\w?=+\-]+)?/i,
	},
	{
		name: "ethiopian_phone",
		pattern:
			/\b(?:0?9[0-9]{8}|0?7[0-9]{8}|\+?251[\s.-]?9[0-9]{8}|2519[0-9]{8})\b/i,
	},
	{
		name: "international_phone",
		pattern: /\b\+?[0-9][\d\s().-]{8,18}\d\b/,
	},
	{
		name: "email",
		pattern: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i,
	},
	{
		name: "url_https",
		pattern: /\bhttps?:\/\/[^\s]+/i,
	},
	{
		name: "url_www",
		pattern: /\bwww\.[a-z0-9][-a-z0-9]*(?:\.[a-z]{2,})+[^\s]*/i,
	},
	{
		name: "bare_domain",
		pattern:
			/\b(?!t\.me|wa\.me)[a-z0-9][-a-z0-9]*\.(?:com|net|org|io|co|me|app|link|eth|et)\b[^\s]*/i,
	},
	{
		name: "telegram_handle",
		pattern: /(?:^|[\s(])@[a-z][\w]{4,31}\b/i,
	},
	{
		name: "social_invite",
		pattern:
			/\b(?:instagram|facebook|fb|twitter|x|linkedin|tiktok|snapchat|discord|signal|viber)\.com\/[\w./-]+/i,
	},
	{
		name: "invite_link",
		pattern: /\b(?:join|invite)\.[^\s]+\/[\w-]+/i,
	},
];

/** Collapse common obfuscation: spaces in digits, (at), [dot], etc. */
function normalizeForScan(text) {
	if (!text || typeof text !== "string") return "";
	return text
		.replace(/\u200b|\u200c|\u200d|\ufeff/g, "")
		.replace(/\(at\)|\[at\]|\s+at\s+/gi, "@")
		.replace(/\(dot\)|\[dot\]|\s+dot\s+/gi, ".")
		.replace(/(\d)\s+(\d)/g, "$1$2")
		.trim();
}

class ChatModerationService {
	validateMessage(text) {
		const normalized = normalizeForScan(text);
		if (!normalized) return { isClean: true, reason: null, rule: null };

		for (const rule of RULES) {
			if (rule.pattern.test(normalized)) {
				return { isClean: false, reason: rule.name, rule: rule.name };
			}
		}
		return { isClean: true, reason: null, rule: null };
	}

	getWarningMessage() {
		return MODERATION_WARNING;
	}

	getViolationThreshold() {
		return VIOLATION_THRESHOLD;
	}

	getViolationWindowHours() {
		return VIOLATION_WINDOW_HOURS;
	}
}

module.exports = new ChatModerationService();
module.exports.MODERATION_WARNING = MODERATION_WARNING;
module.exports.normalizeForScan = normalizeForScan;
