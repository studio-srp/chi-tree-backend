const express = require("express");
const BioMarkersController = require("../controllers/BioMarkersController");

const router = express.Router();

router
  .route("/")
  .get(BioMarkersController.getBioMarkers)
  .post(BioMarkersController.createBioMarkers);

module.exports = router;
