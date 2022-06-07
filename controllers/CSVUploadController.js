const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const csv = require("csvtojson");
const path = require("path");
const Patient = require("../models/patientModel");
const Biomarker = require("../models/biomarkerModel");
const Report = require("../models/reportModel");
const bcrypt = require("bcrypt");
// const { updateUser } = require("./PatientDetailsController");

exports.uploadCSV = catchAsync(async (req, res, next) => {
  let uploadPath = path.join(__dirname, "..", "uploads", "uploaded.csv");

  const file = req.files.csvFile;

  file.mv(uploadPath, (err) => {
    if (err) {
      console.log(err);
    }
  });

  const json = await csv().fromFile(uploadPath);

  const biomarkerList = await Biomarker.find();

  let newReports = [];

  await Promise.all(
    json.map(async (row) => {
      const {
        firstName,
        lastName,
        gender,
        email,
        username,
        dob,
        testDate,
        labName,
      } = row;

      const existedBiomarkers = biomarkerList.map((biomarker) => {
        if (biomarker.name in row) {
          let diviation = Math.floor(
            (row[`${biomarker.name}`] / biomarker.rangeOptimal) * 50
          );
          let points;
          if (diviation > 100) {
            points = 0;
          } else if (diviation > 50) {
            points = 100 - (diviation - 50) * 2;
          } else {
            points = diviation * 2;
          }

          return {
            biomarker: biomarker._id,
            biomarkerValue: row[`${biomarker.name}`],
            score: points,
          };
        }
      });

      // Create the report
      const report = await Report.create({
        biomarkers: existedBiomarkers,
      });

      let testedAt = new Date(testDate);
      testedAt.setDate(testedAt.getDate() + 1);

      newReports.push({
        reportId: report._id,
        testedAt,
        labName,
      });
    })
  );

  // Checking the patient credentials
  const patient = await Patient.findOne({ email: json[0].email });

  // If the patient exists
  if (patient) {
    let { reports } = patient;

    reports = [...reports, ...newReports];

    await Patient.findByIdAndUpdate(
      { _id: patient._id },
      { reports: reports },
      { new: true, runValidators: false }
    );
    //If there is no patient exists
  } else {
    let hashPassword = await bcrypt.hash("12345", 10);

    const { firstName, lastName, gender, email, username, dob } = json[0];

    // Create Patient Details
    const patientCreated = await Patient.create({
      firstName,
      lastName,
      dob,
      gender,
      email,
      username,
      isAdmin: false,
      password: hashPassword,
      reports: newReports,
    });
  }
  res.status(200).json({ status: "success" });
});
