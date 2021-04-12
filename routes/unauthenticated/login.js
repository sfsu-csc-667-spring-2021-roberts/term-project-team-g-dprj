const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const initializePassport = require('../../passport-config');

// passport
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

router.use(flash())

router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

/* GET login listing. */
router.get("/", (req, res) => {
    res.render("unauthenticated/login");
});

router.post("/users/login", passport.authenticate('local' , {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
