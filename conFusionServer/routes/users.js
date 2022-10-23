var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var router = express.Router();

var passport = require('passport');
// const { authenticate } = require('passport');

var authenticate = require('../authenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  //User.findOne({username: req.body.username})
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
  if(err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.json({err: err});
    }
  else {
    passport.authenticate('local')(req, res, ()=> {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success:true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});

  /* if (!req.session.user) {
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
    User.findOne({username: username})
    .then((user) =>{
      if (user === null) {
        var err = new Error('User ' + username + ' doest not exist');
        res.setHeader('WWW-Authonticate', 'Basic');
        err.status = 403;
        return next(err);
      }
      else if (user.password !== password) {
        var err = new Error('Your password is incorrect!');
        err.status = 403;
        return next(err);
      }
      else if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          // res.cookie('user', 'admin', {signed: true});
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated');
      }
    })
    .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  } */
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
