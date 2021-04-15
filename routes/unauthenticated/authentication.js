const express = require('express');
const router = express.Router();
const passport = require('../../authentication/config');
const bcrypt = require('bcrypt');
const Users = require('../../db').Users;

router.get('/logout', (request, response) => {
  request.logout();
  response.redirect('/');
});

router.get('/login', (request, response) => {
  response.render('unauthenticated/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

router.get('/register', (request, response, next) => {
  response.render('unauthenticated/register', { message: 'error' });
});

router.post('/register', (request, response) => {
  const { name, email, password, password2 } = request.body;

  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ message: 'Please enter all fields' });
  }

  if (password.length < 8) {
    errors.push({ message: 'Password must be at least 8 characters' });
  }

  if (password != password2) {
    errors.push({ message: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    response.render('unauthenticated/register', { errors });
  } else {
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => Users.create(name, email, hashedPassword))
      .then((user) => {
        request.login(user, (error) => {
          if (error) return next(error);

          response.redirect('/lobby');
        });
      })
      .catch((_) => response.render('unauthenticated/register', { errors: ['Failed to create a new user.'] }));
  }
});

module.exports = router;
