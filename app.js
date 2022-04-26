const express = require("express");
const PatientDetailsRoute = require("./routes/PatientDetailsRoute");
const BioMarkersRoute = require("./routes/BioMarkersRoute");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use("/userDetails", PatientDetailsRoute);
// app.use("/biomarkers", BioMarkersRoute);

module.exports = app;
