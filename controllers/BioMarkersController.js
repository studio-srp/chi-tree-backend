const BioMarker = require("../models/biomarkerModel");
const catchAsync = require("../utils/catchAsync");

exports.getBioMarkers = catchAsync(async (req, res, next) => {
  const biomarkers = await BioMarker.find();
  res.status(200).json({ status: "success", biomarkers });
});

exports.createBioMarkers = catchAsync(async (req, res, next) => {
  const biomarker = req.body.biomarkers;

  const biomarkerList = await Promise.all(
    biomarker.map(async (marker) => {
      const { description, name, unit, rangeLow, rangeHigh, rangeOptimal } =
        marker;

      const bioMarker = await BioMarker.create({
        description,
        name,
        unit,
        rangeLow,
        rangeHigh,
        rangeOptimal,
      });
    })
  );

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin", "*");

  res.status(200).json({
    status: "success",
    message: "successfully created the biomarkers",
  });
});
