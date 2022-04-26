const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  biomarkers: [
    {
      biomarkerId: { type: mongoose.Schema.ObjectId, ref: "Biomarker" },
      biomarkerValue: {
        type: Number,
        required: [true, "Biomarker value is required"],
      },
    },
  ],
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
