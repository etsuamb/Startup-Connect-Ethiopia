const express = require("express");
const multer = require("multer");
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 25 * 1024 * 1024 },
});

const {
	authenticate,
	authorizeRoles,
	requireApproval,
} = require("../middleware/authMiddleware");
const chatController = require("../controllers/chatController");
const { chatModerationMiddleware } = require("../middleware/chatModerationMiddleware");

/**
 * Chat + video session API (same paths under /api/chat or /api/startups/chat).
 * @param {import("express").RequestHandler[]} accessMiddleware e.g. [authenticate, authorizeRoles("Startup")]
 */
function buildChatRoutes(accessMiddleware) {
	const router = express.Router();
	const chain = accessMiddleware;

	router.post("/conversations", ...chain, chatController.createOrGetConversation);
	router.get("/conversations", ...chain, chatController.listConversations);
	router.get("/conversations/:id/messages", ...chain, chatController.getMessages);
	router.post(
		"/conversations/:id/messages",
		...chain,
		chatModerationMiddleware({ channel: "investor" }),
		chatController.sendTextMessage,
	);
	router.post(
		"/conversations/:id/files",
		...chain,
		upload.single("file"),
		chatModerationMiddleware({ channel: "investor" }),
		chatController.uploadChatFile,
	);
	router.get("/notifications", ...chain, chatController.getChatNotifications);

	router.post("/conversations/:id/video/start", ...chain, chatController.videoStart);
	router.post("/conversations/:id/video/join", ...chain, chatController.videoJoin);
	router.post("/conversations/:id/video/end", ...chain, chatController.videoEnd);
	router.get("/conversations/:id/video/status", ...chain, chatController.videoStatus);
	router.post(
		"/conversations/:id/video/screen-share",
		...chain,
		chatController.videoScreenShare,
	);

	router.get(
		"/conversations/:id/files/:messageId",
		...chain,
		chatController.downloadChatFile,
	);

	return router;
}

const defaultAccess = [
	authenticate,
	requireApproval,
	authorizeRoles("Startup", "Investor"),
];
const router = buildChatRoutes(defaultAccess);
router.buildChatRoutes = buildChatRoutes;

module.exports = router;
