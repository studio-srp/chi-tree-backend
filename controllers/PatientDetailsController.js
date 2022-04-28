const Patient = require("./../models/patientModel");
const Report = require("./../models/reportModel");
const BioMarker = require("./../models/biomarkerModel");
const catchAsync = require("./../utils/catchAsync");

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

  let patientCheck = await Patient.findOne({ username, password });

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
    //   TODO: Hash Password
    // Create Patient Details
    const patient = await Patient.create({
      firstName,
      lastName,
      dob,
      gender,
      email,
      username,
      password,
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