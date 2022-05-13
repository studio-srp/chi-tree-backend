const Patient = require("./../models/patientModel");
const Report = require("./../models/reportModel");
const BioMarker = require("./../models/biomarkerModel");
const catchAsync = require("./../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.getPatientDetails = catchAsync(async (req, res, next) => {
  const patient = await Patient.find();
  res.status(200).json({ status: "success", patient });
});

exports.createPatientDetails = catchAsync(async (req, res, next) => {
  const {
    biomarkers,
    firstName,
    lastName,
    dob,
    gender,
    email,
    username,
    password,
    testedAt,
    labName,
    isAdmin,
  } = req.body;

  let hashPassword = await bcrypt.hash(password, 10);

  let patientCheck = await Patient.findOne({
    username,
    email,
  });

  // Getting the relevent biomarker Id's from database
  const object = await Promise.all(
    biomarkers.map(async (marker) => {
      const markerId = await BioMarker.findOne({ name: marker.name });

      let diviation = Math.floor((marker.value / markerId.rangeOptimal) * 50);

      let points;
      if (diviation > 100) {
        points = 0;
      } else if (diviation > 50) {
        points = 100 - (diviation - 50) * 2;
      } else {
        points = diviation * 2;
      }

      return {
        biomarker: markerId._id,
        biomarkerValue: marker.value,
        score: points,
      };
    })
  );

  //   Create the report
  const report = await Report.create({
    biomarkers: object,
  });

  if (patientCheck) {
    let reports = patientCheck.reports;
    reports.push({
      reportId: report._id,
      testedAt,
      labName,
    });

    await Patient.findByIdAndUpdate(
      { _id: patientCheck._id },
      { reports: reports },
      { new: true, runValidators: false }
    );

    res.status(200).json({ status: "success", message: patientCheck });
  } else {
    // Create Patient Details
    const patient = await Patient.create({
      firstName,
      lastName,
      dob,
      gender,
      email,
      username,
      isAdmin,
      password: hashPassword,
      reports: [
        {
          reportId: report.id,
          testedAt,
          labName,
        },
      ],
    });

    res.status(200).json({ status: "success", patient });
    // }
  }
});

exports.checkEmail = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const patient = await Patient.findOne({ email });

  if (patient) {
    res.status(200).json({ status: "success", patient });
  } else {
    res.status(200).json({ status: "error", message: "patient is not exist" });
  }
});
