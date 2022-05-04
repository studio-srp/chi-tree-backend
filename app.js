const express = require("express");
const PatientDetailsRoute = require("./routes/PatientDetailsRoute");
const BioMarkersRoute = require("./routes/BioMarkersRoute");
const AppError = require("./utils/appError");
const errorController = require("./controllers/ErrorController");
const AuthenticationDetailsRoute = require("./routes/AuthenticationDetailsRoute");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/auth", AuthenticationDetailsRoute);
app.use("/patientdetails", PatientDetailsRoute);
app.use("/biomarkers", BioMarkersRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`));
});

app.use(errorController);

module.exports = app;
