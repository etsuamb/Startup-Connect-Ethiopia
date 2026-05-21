const router = require("express").Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
	authenticate,
	authorizeRoles,
} = require("../middleware/authMiddleware");

const startupController = require("../controllers/startupController");

// Create startup profile
router.post(
	"/profile",
	authenticate,
	authorizeRoles("Startup"),
	upload.fields([
		{ name: "pitch_deck", maxCount: 1 },
		{ name: "business_plan", maxCount: 1 },
	]),
	startupController.createStartupProfile,
);

// Get current startup profile
router.get(
	"/me",
	authenticate,
	authorizeRoles("Startup"),
	startupController.getMyStartupProfile,
);

// Update existing startup profile
router.put(
	"/profile",
	authenticate,
	authorizeRoles("Startup"),
	upload.fields([
		{ name: "pitch_deck", maxCount: 1 },
		{ name: "business_plan", maxCount: 1 },
	]),
	startupController.updateStartupProfile,
);

// Get startup documents
router.get(
	"/documents",
	authenticate,
	authorizeRoles("Startup"),
	startupController.getStartupDocuments,
);

module.exports = router;
