// Project QA HUB

const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');


const indexRouter = require("./routes/index");
const authLocalRouter = require("./routes/authLocal");
const homeRouter = require("./routes/home");

const app = express();

// MongoDB connection
require('./database/db-connection');

// Passport config
require('./config/passport')(passport);

// view engine setup
app.set("views", path.join(__dirname, "views"));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// global variables
app.use((req, res, next) => {
	res.locals.successMsg = req.flash('successMsg');
	res.locals.errorMsg = req.flash('errorMsg');
	res.locals.error = req.flash('error');
	next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authLocalRouter);
app.use("/home", homeRouter);

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
	res.render('error');
});

module.exports = app;
