const express = require("express");
const PatientDetailsController = require("../controllers/PatientDetailsController");

const router = express.Router();

router
  .route("/")
  .get(PatientDetailsController.getPatientDetails)
  .post(PatientDetailsController.createPatientDetails);

router.route("/email-check").post(PatientDetailsController.checkEmail);

router.route("/report").post(PatientDetailsController.delete);

module.exports = router;
