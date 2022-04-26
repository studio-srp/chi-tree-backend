const mongoose = require("mongoose");

const biomarkerSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, "Biomarker name is required"],
  },
  name: {
    type: String,
    required: [true, "Biomarker name is required"],
  },
  unit: { type: String, required: [true, "Biomarker unit is required"] },
  rangeLow: {
    type: Number,
    required: [true, "Biomarker range low is required"],
  },
  rangeHigh: {
    type: Number,
    required: [true, "Biomarker range high is required"],
  },
  rangeOptimal: {
    type: Number,
    required: [true, "Biomarker range optimal is required"],
  },
});

const Biomarker = mongoose.model("Biomarker", biomarkerSchema);

module.exports = Biomarker;
