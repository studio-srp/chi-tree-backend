const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: { type: String, required: [true, "Second name is required"] },
  dob: Date,
  gender: { type: String, required: [true, "Gender is required"] },
  email: { type: String, required: [true, "Email is required"] },
  username: { type: String, required: [true, "Username is required"] },
  password: { type: String, required: [true, "Password is required"] },
  reports: [
    {
      reportId: { type: mongoose.Schema.ObjectId, ref: "Report" },
      testedAt: Date,
      labName: { type: String, required: [true, "Lab name is required"] },
    },
  ],
  isAdmin: { type: Boolean, default: false },
});

patientSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reports.reportId",
  });
  next();
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
