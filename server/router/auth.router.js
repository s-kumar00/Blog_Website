const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.get("/test", authController.test);
router.get("/signOut", authController.signOut);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/emailVerification", authController.emailVerification)
router.post("/otpVerification", authController.otpVerification)
router.post("/changePassword", authController.changePassword)

module.exports = router;


