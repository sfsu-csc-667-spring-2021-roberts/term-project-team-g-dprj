const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../../passport-config');
const users = []

initializePassport(
    passport, 
    email => users.find(user => user.email === email));

/* GET login listing. */
router.get("/", (req, res) => {
    res.render("unauthenticated/login");
});

router.post("unauthenticated/login", passport.authenticate('local' , {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router;
