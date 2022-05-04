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
  } = req.body;

  let hashPassword;

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    hashPassword = password;
  });

  let patientCheck = await Patient.findOne({
    username,
    password: hashPassword,
  });

  // Getting the relevent biomarker Id's from database
  const object = await Promise.all(
    biomarkers.map(async (marker) => {
      const markerId = await BioMarker.find({ name: marker.name }).select(
        "_id"
      );

      return {
        biomarkerId: markerId[0]._id,
        biomarkerValue: marker.value,
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
  }
});
