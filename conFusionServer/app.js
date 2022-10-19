var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const { createConnection } = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.Promise = Promise;

const url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url, {useMongoClient:true})
  .then((db) => console.log("Database Connected Successfully"))

  .catch((err) => console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Authorization configuration
function auth (req, res, next) {
  console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
  }
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':'); //alloc
  var username = auth[0];
  var password = auth[1];
  if (username === 'admin' && password === 'password') {
    return next();
  }
  else {
    var err = new Error('You are not authonticated!');
    res.setHeader('WWW-Authonticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

app.use(auth);

// After retreive static file from static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);


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
