var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./model/User')
const Message = require('./model/Message')
const session = require('express-session');
const passport = require('passport')
const flash = require('express-flash')
require('./config/passport');


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


var routes = require('./routes/routes');
var usersRouter = require('./routes/users');
const { text } = require('express');

var app = express();

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE_URL)
}
/* tb deleted : shows user DB content
async function dblook() {
  const db = await User.find();
  console.log('USERS DB =' + db)
}
dblook()
async function msglook() {
  const msgdb = await Message.find();
  console.log('MESSAGE DB =' + msgdb)
}
msglook()*/ 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(flash())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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
