const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/emailVerification", authController.emailVerification)
router.post("/otpVerification", authController.otpVerification)
router.post("/changePassword", authController.changePassword)

module.exports = router;


