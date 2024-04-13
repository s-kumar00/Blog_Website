const router = require("express").Router();
const userController = require("../controllers/user.control")
const verifyToken = require("../utils/verifyToken");

router.get("/test",verifyToken, userController.test);
router.delete('/delete/:id', verifyToken, userController.deleteUser);
router.put('/update/:userId', verifyToken, userController.updateUser);
router.put('/updatePassword/:id',verifyToken, userController.updatePassword);

module.exports = router;


