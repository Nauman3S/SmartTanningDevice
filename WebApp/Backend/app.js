require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const app = express();
// app.use(cors());
app.use(cors({
  origin: '*'
}));
const userRoute = require("./routes/api/users");
const mqttRoute = require("./routes/api/mqtt");
const checkRoute = require("./routes/api/check");
const mqttPublishFieldsRoute = require("./routes/api/mqttPublishFields");
// const fileUploadRoute = require("./routes/api/fileUpload");

//Database Connection
require("./db/connection");

// // app.use(cors());
// app.use(cors({
//   origin: '*'
// }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/users", userRoute);
app.use("/api/mqtt", mqttRoute);
app.use("/api/check", checkRoute);
app.use("/api/mqttPublishFields", mqttPublishFieldsRoute);
// app.use("/api/fileUpload", fileUploadRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;