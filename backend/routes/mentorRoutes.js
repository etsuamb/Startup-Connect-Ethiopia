const router = require("express").Router();

const {
	authenticate,
	authorizeRoles,
	requireApproval,
} = require("../middleware/authMiddleware");
const mentorController = require("../controllers/mentorController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
	"/profile",
	authenticate,
	authorizeRoles("Mentor"),
	upload.fields([
		{ name: "cv", maxCount: 1 },
		{ name: "certifications", maxCount: 10 },
		{ name: "intro_video", maxCount: 1 },
	]),
	mentorController.createMentorProfile,
);

router.put(
	"/profile",
	authenticate,
	authorizeRoles("Mentor"),
	upload.fields([
		{ name: "cv", maxCount: 1 },
		{ name: "certifications", maxCount: 10 },
		{ name: "intro_video", maxCount: 1 },
	]),
	mentorController.updateMentorProfile,
);

router.get(
	"/all",
	authenticate,
	requireApproval,
	mentorController.getAllMentors,
);

// Get mentor detail including documents
router.get(
	"/:mentorId",
	authenticate,
	requireApproval,
	mentorController.getMentorById,
);

module.exports = router;
