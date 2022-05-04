const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  biomarkers: [
    {
      biomarker: { type: mongoose.Schema.ObjectId, ref: "Biomarker" },
      biomarkerValue: {
        type: Number,
        required: [true, "Biomarker value is required"],
      },
      score: {
        type: Number,
        require: [true, "Biomarker score is required"],
      },
    },
  ],
});

reportSchema.pre(/^find/, function (next) {
  this.populate({
    path: "biomarkers.biomarker",
  });
  next();
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
