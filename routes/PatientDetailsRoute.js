const express = require("express");
const PatientDetailsController = require("../controllers/PatientDetailsController");

const router = express.Router();

router
  .route("/")
  .get(PatientDetailsController.getPatientDetails)
  .post(PatientDetailsController.createPatientDetails);

router.route("/delete-user").post(PatientDetailsController.deleteUser);

router.route("/update-user").post(PatientDetailsController.updateUser);

router.route("/email-check").post(PatientDetailsController.checkEmail);

router.route("/report").post(PatientDetailsController.delete);
router.route("/get-report").post(PatientDetailsController.getReport);
router.route("/delete-report").post(PatientDetailsController.deleteReport);

module.exports = router;
