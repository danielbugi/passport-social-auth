// *** main dependencies *** //
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var swig = require("swig");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// *** routes *** //
var routes = require("./routes/index.js");

// *** express instance *** //
var app = express();

// *** view engine *** //
var swig = new swig.Swig();
app.engine("html", swig.renderFile);
app.set("view engine", "html");

// *** static directory *** //
app.set("views", path.join(__dirname, "views"));

// *** config middleware *** //
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/public")));

// env config path
dotenv.config({ path: "./config.env" });

// *** main routes *** //
app.use("/", routes);

// session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

// DB connction

const DB = process.env.DB_CONNECTION.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
);
mongoose.connect(DB).then(console.log("Connect success to DB"));

module.exports = app;
