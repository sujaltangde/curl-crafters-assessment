const express = require("express");
const { register, login, isLogin } = require("../controllers/userControls");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/isLogin").get(isAuthenticated, isLogin);
// router.route("/userDetails").get(isAuthenticated, userDetails) ;

module.exports = router;
