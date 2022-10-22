var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// express with express session
var session = require('express-session');
var FileStore = require('session-file-store');
var MongoStore = require('connect-mongo');

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

//configure passport to authentication process
var passport = require('passport');
var authenticate = require('./authenticate');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up your Express application to send signed cookies.
// app.use(cookieParser('passwordcookie'));
// change cookie parser to express session

app.use(session({
  name:'session-id',
  secret: 'passwordcookie',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/conFusion' })
}));

// to add passport authentication
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Authorization configuration
function auth (req, res, next) {
  // console.log(req.signedCookies);
  //console.log(req.session);
  // if (!req.signedCookies.user) {
  // if (!req.session.user) {
  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    next(err);
    return;
  }
  else {
    // if (req.signedCookies.user === 'admin') {
    next();
  }
}

app.use(auth);

// After retreive static file from static folder
app.use(express.static(path.join(__dirname, 'public')));


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
