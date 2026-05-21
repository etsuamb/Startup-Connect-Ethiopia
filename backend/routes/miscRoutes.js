const router = require("express").Router();
const miscController = require("../controllers/miscController");

// POST /api/contact
router.post("/contact", miscController.receiveContactMessage);

module.exports = router;
