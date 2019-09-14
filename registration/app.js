var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require("express-session");
var app = express();
var auth = require("./modules/auth");



// Connecting to the database
mongoose.connect("mongodb://localhost/loginReg", {useNewUrlParser: true}, (err) => {
  err ? console.log("Error") : console.log("Connected to the server");
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Creating a session. It should be created after cookie-parser because, session needs cookies.
app.use(session({
  secret: "Hello",
  resave: true,
  saveUninitialized: false
}));


// adding auth middleware before the routes
app.use(auth.checkLoggedUser);


app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
