const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
// Environment needs to be loaded before we can load passport (so we can connect to the DB)
const passport = require('./authentication/config');

const testsRouter = require('./routes/tests');
const devRouter = require('./routes/dev');

const homeRouter = require('./routes/unauthenticated/home');
const authenticationRouter = require('./routes/unauthenticated/authentication');

const lobbyRouter = require('./routes/authenticated/lobby');
const gamesRouter = require('./routes/authenticated/games');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(flash());
app.use(passport.initialize());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Development and testing routes
app.use('/tests', testsRouter);
app.use('/dev', devRouter);

// Unauthenticated routes
app.use('/', homeRouter, authenticationRouter);

// Authenticated routes
app.use('/lobby', lobbyRouter);
app.use('/games', gamesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
