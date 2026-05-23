const router = require("express").Router();

const {
	authenticate,
	authorizeRoles,
	requireApproval,
} = require("../middleware/authMiddleware");
const paymentController = require("../controllers/paymentController");

router.post("/webhooks/chapa", paymentController.handleChapaWebhook);

router.get(
	"/investment-items",
	authenticate,
	requireApproval,
	authorizeRoles("Investor"),
	paymentController.getInvestmentPaymentItems,
);

router.post(
	"/chapa/initialize",
	authenticate,
	requireApproval,
	authorizeRoles("Investor"),
	paymentController.initializeChapaPayment,
);

router.post(
	"/chapa/hosted",
	authenticate,
	requireApproval,
	authorizeRoles("Investor"),
	paymentController.createChapaHostedPayment,
);

router.get(
	"/chapa/verify/:txRef",
	authenticate,
	requireApproval,
	authorizeRoles("Investor"),
	paymentController.verifyChapaPayment,
);

module.exports = router;
