const router = require("express").Router();
const { authenticate } = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

// Notification settings
router.get("/settings", authenticate, notificationController.getNotificationSettings);
router.put("/settings", authenticate, notificationController.updateNotificationSettings);

// Existing notification routes
router.get("/", authenticate, notificationController.listNotifications);
router.patch("/:id", authenticate, notificationController.updateNotification);
router.get("/unread-count", authenticate, notificationController.unreadCount);
router.put("/mark-all-read", authenticate, notificationController.markAllRead);

module.exports = router;
