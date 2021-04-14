const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

if(process.env.NODE_ENV === 'development') {
  require("dotenv").config();
}

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testsRouter = require('./routes/tests');
const devRouter = require('./routes/dev');
const loginRouter = require('./routes/unauthenticated/login');
const registerRouter = require('./routes/unauthenticated/register');
const gameRouter = require('./routes/authenticated/games');
const gameLobbyRouter = require('./routes/authenticated/game-lobby');
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

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tests', testsRouter);
// routes to game room
app.use('/dev', devRouter);
app.use('/unauthenticated/login', loginRouter);
app.use('/unauthenticated/register', registerRouter);
app.use('/authenticated/games', gameRouter);
app.use('/authenticated/game-lobby', gameLobbyRouter);
app.use('/authenticated/lobby', lobbyRouter);

/* POST register listing. */
app.post('/login', (req,res,next) => {
  res.render('unauthenticated/login');
});

/* POST register listing. */
app.post("/register", async (req,res) => {
  let { name, email, password, password2 } = req.body;

  console.log({
    name, 
    email, 
    password, 
    password2
  });

  // let errors = []

  if(!name || !email || !password || !password2) {
    errors.push({ message: 'Please enter all fields'});
  }

  if(password.length < 8) {
    errors.push({ message:'Password must be at least 8 characters'});
  }

  // if(password != password2) {
  //   errors.push({ message:'Passwords do not match'});
  // }

  // if(errors.length > 0) {
  //   res.render("unauthenticated/register", { errors }); // render to views folder 
  // } else {

  //   // validate password
  //   let hashedPassword = await bcrypt.hash(password,10);
  //   console.log(hashedPassword);

  //   pool.query(
  //     `SELECT * FROM users
  //     WHERE email $1`, 
  //     [email],
  //     (err, results) => {
  //       if(err){
  //         throw err;
  //       }
  //       console.log(results.rows);

  //       if(results.rows.length > 0) {
  //         errors.push({ message: "Email already registered!"});
  //         res.render("/register", { errors });
  //       }
  //     }
  //   )
  // }
});

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
