var express = require("express");
var weblog = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var users = require("./routes/users");
var logger = require("./logger");

var app = express();

app.use(weblog("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/users", users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  logger.error("Unable to process request", err);

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
