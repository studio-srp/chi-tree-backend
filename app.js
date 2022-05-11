const express = require("express");
const PatientDetailsRoute = require("./routes/PatientDetailsRoute");
const BioMarkersRoute = require("./routes/BioMarkersRoute");
const AppError = require("./utils/appError");
// const errorController = require("./controllers/ErrorController");
const AuthenticationDetailsRoute = require("./routes/AuthenticationDetailsRoute");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join("public")));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/patientdetails", PatientDetailsRoute);
app.use("/api/biomarkers", BioMarkersRoute);
app.use("/api/auth", AuthenticationDetailsRoute);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

module.exports = app;
