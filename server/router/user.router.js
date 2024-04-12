const router = require("express").Router();
const userController = require("../controllers/user.control")
const verifyToken = require("../utils/verifyToken");

router.get("/test", userController.test);
router.get("/protected", verifyToken, userController.protected);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:userId', verifyToken, userController.updateUser);
router.put('/updatePassword/:id', userController.updatePassword);

module.exports = router;


