const chatModerationService = require("../services/chatModerationService");
const chatModerationActions = require("../services/chatModerationActions");

const WARNING = chatModerationService.getWarningMessage();

/**
 * Express middleware: blocks REST messages containing off-platform contact info.
 * Expects req.body.text or req.body.body; optional req.chatModerationMeta.
 */
function chatModerationMiddleware(options = {}) {
	const channel = options.channel || "investor";

	return async (req, res, next) => {
		try {
			const body = req.body || {};
			const text =
				typeof body.text === "string"
					? body.text
					: typeof body.body === "string"
						? body.body
						: typeof body.caption === "string"
							? body.caption
							: "";

			if (!text.trim()) return next();

			const validation = chatModerationService.validateMessage(text);
			if (validation.isClean) return next();

			const conversationId =
				Number(req.params.id) ||
				Number(req.params.conversationId) ||
				Number(req.chatModerationMeta?.conversationId);

			if (conversationId && req.user?.user_id) {
				await chatModerationActions.recordViolation({
					senderUserId: req.user.user_id,
					conversationId,
					attemptedMessage: text,
					flaggedReason: validation.reason,
					channel,
				});
			}

			return res.status(422).json({
				error: WARNING,
				code: "MODERATION_BLOCKED",
				flagged_reason: validation.reason,
			});
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	};
}

module.exports = { chatModerationMiddleware, MODERATION_WARNING: WARNING };
