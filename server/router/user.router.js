const router = require("express").Router();
const userController = require("../controllers/user.control");


router.get("/test", userController.test);

module.exports = router;


