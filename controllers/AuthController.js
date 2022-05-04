const Patient = require("./../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");

exports.getLoginAuthentication = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  console.log(username);

  if (!username || !password) {
    res.status(401).json({
      status: "error",
      message: "please enter the username and password",
    });
  }

  const patient = await Patient.findOne({ username });

  let authResult = await bcrypt.compare(password, patient.password);

  if (authResult) {
    res.status(200).json({
      status: "success",
      message: "Login successful",
    });
  } else {
    res.status(200).json({
      status: "fail",
      message: "Invalid credentials",
    });
  }
});
