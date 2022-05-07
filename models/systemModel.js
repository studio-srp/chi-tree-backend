const mongoose = require("mongoose");
const systemSchema = mongoose.Schema({
  system: [
    {
      systemName: {
        type: String,
        required: true,
      },
      systemBiomarkerList: [String],
    },
  ],
});

const System = mongoose.model("System", systemSchema);

module.exports = System;
