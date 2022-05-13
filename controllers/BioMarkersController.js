const BioMarker = require("../models/biomarkerModel");
const System = require("../models/systemModel");
const catchAsync = require("../utils/catchAsync");

exports.getBioMarkers = catchAsync(async (req, res, next) => {
  const biomarkers = await BioMarker.find();
  res.status(200).json({ status: "success", biomarkers });
});

exports.createBioMarkers = catchAsync(async (req, res, next) => {
  const biomarker = req.body.biomarkers;

  // if (biomarkers.length > 1) {
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
  // }
  //  else {
  //   const { description, name, unit, rangeLow, rangeHigh, rangeOptimal } =
  //     req.body;

  //   const bioMarker = await BioMarker.create({
  //     description,
  //     name,
  //     unit,
  //     rangeLow,
  //     rangeHigh,
  //     rangeOptimal,
  //   });
  // }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin", "*");

  res.status(200).json({
    status: "success",
    message: "successfully created the biomarkers",
  });
});

exports.createSystemList = catchAsync(async (req, res, next) => {
  const system = req.body.systems;

  const createdSystem = await System.create({ system });

  res.status(200).json({ status: "success", createdSystem });
});

exports.getSystemList = catchAsync(async (req, res, next) => {
  const systems = await System.find();
  res.status(200).json({ status: "success", systems });
});
