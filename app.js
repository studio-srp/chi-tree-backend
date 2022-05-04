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

app.use("/patientdetails", PatientDetailsRoute);
app.use("/biomarkers", BioMarkersRoute);
app.use("/auth", AuthenticationDetailsRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`));
});

app.use(errorController);

module.exports = app;

// let value = 21;

// let optimal = 29;

// let diviation = Math.floor((value / optimal) * 50);

// console.log(diviation);

// let points;
// if (diviation > 50) {
//   points = 100 - (diviation - 50) * 2;
// } else {
//   points = diviation * 2;
// }

// console.log(points);
