const Patient = require("./../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.getLoginAuthentication = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({
      status: "error",
      message: "please enter the username and password",
    });
  }

  let patient = await Patient.findOne({ username });

  let authResult = await bcrypt.compare(password, patient.password);

  patient.password = undefined;

  if (authResult) {
    res.status(200).json({
      status: "success",
      patient: patient,
    });
  } else {
    res.status(200).json({
      status: "fail",
      message: "Invalid credentials",
    });
  }
});
