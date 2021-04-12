const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const initializePassport = require('./passport-config');
const users = []

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const loginRouter = require('./routes/unauthenticated/login');
const registerRouter = require('./routes/unauthenticated/register');
const gameRouter = require('./routes/authenticated/games');
const lobbyRouter = require('./routes/authenticated/lobby');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// passport

initializePassport(
  passport, 
  email => users.find(user => user.email === email));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
app.use('/unauthenticated/login', loginRouter);
app.use('/unauthenticated/register', registerRouter);
app.use('/authenticated/games', gameRouter);
app.use('/authenticated/lobby', lobbyRouter);

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