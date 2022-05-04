const express = require("express");
const LoginAuthenticationController = require("./../controllers/AuthController");

const router = express.Router();

router.route("/").get(LoginAuthenticationController.getLoginAuthentication);

module.exports = router;
