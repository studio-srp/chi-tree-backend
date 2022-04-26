const express = require("express");
const PatientDetailsController = require("../controllers/PatientDetailsController");

const router = express.Router();

router
  .route("/")
  .get(PatientDetailsController.getPatientDetails)
  .post(PatientDetailsController.createPatientDetails);

module.exports = router;
