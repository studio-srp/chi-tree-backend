const express = require("express");
const BioMarkersController = require("../controllers/BioMarkersController");

const router = express.Router();

router
  .route("/")
  .get(BioMarkersController.getBioMarkers)
  .post(BioMarkersController.createBioMarkers);

router
  .route("/system")
  .post(BioMarkersController.createSystemList)
  .get(BioMarkersController.getSystemList);

module.exports = router;
