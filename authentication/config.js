const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Users = require('../db').Users;

const authenticateUser = (email, password, done) => {
  Users.findByEmail(email)
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, passwordValid]) => {
      if (passwordValid) {
        return done(null, user);
      } else {
        return done(null, false, { errors: ['The supplied credentials are invalid.'] });
      }
    })
    .catch((error) => {
      return done(null, false, { errors: ['The supplied credentials are invalid.'] });
    });
};

passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

passport.serializeUser(({ id, fullname, email }, done) => {
  return done(null, id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((error) => {
      return done(error, null);
    });
});

module.exports = passport;
