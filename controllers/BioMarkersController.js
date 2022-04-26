const BioMarker = require("../models/biomarkerModel");
const catchAsync = require("../utils/catchAsync");

exports.getBioMarkers = catchAsync(async (req, res, next) => {
  const biomarkers = await BioMarker.find();
  res.status(200).json({ status: "success", biomarkers });
});

exports.createBioMarkers = catchAsync(async (req, res, next) => {
  const { description, name, unit, rangeLow, rangeHigh, rangeOptimal } =
    req.body;

  const bioMarkerCheck = await BioMarker.findOne({ name, unit });

  if (!bioMarkerCheck) {
    const bioMarker = await BioMarker.create({
      description,
      name,
      unit,
      rangeLow,
      rangeHigh,
      rangeOptimal,
    });
    res.status(200).json({
      status: "success",
      message: "created new biomarker",
      data: bioMarker,
    });
  } else {
    res.status(200).json({
      status: "warning",
      message: "biomarker already exists",
    });
  }
});
