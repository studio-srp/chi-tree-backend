const express = require("express");
const fileUpload = require("express-fileupload");
const CSVUploadController = require("./../controllers/CSVUploadController");

const router = express.Router();

router.route("/").post(fileUpload(), CSVUploadController.uploadCSV);

module.exports = router;
