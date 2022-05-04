const express = require("express");
const LoginAuthenticationController = require("./../controllers/AuthController");

const router = express.Router();

router.route("/").post(LoginAuthenticationController.getLoginAuthentication);

module.exports = router;
