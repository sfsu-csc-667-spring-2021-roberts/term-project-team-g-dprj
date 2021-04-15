const express = require("express");
const router = express.Router();
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("../../passport-config");
const bcrypt = require("bcrypt");
const { pool } = require("../../config/config");

// passport
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

router.use(flash());

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

router.get("/login", (request, response) => {
  response.render("unauthenticated/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/lobby",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register", (request, response) => {
  response.render("unauthenticated/register", { message: "error" });
});

// router.post("/unauthenticated/register", async (req,res) => {
//     let { name, email, password, password2 } = req.body;

//     console.log({
//         name,
//         email,
//         password,
//         password2
//     });

//     let errors = []

//     if(!name || !email || !password || !password2) {
//         errors.push({ message: 'Please enter all fields'});
//     }

//     if(password.length < 8) {
//         errors.push({ message:'Password must be at least 8 characters'});
//     }

//     if(password != password2) {
//         errors.push({ message:'Passwords do not match'});
//     }

//     if(errors.length > 0) {
//         res.render("/unauthenticated/register", { errors });
//     } else {

//         // validate password
//         let hashedPassword = await bcrypt.hash(password,10);
//         console.log(hashedPassword);

//         pool.query(
//             `SELECT * FROM users
//             WHERE email $1`,
//             [email],
//             (err, results) => {
//                 if(err){
//                     throw err;
//                 }
//                 console.log(results.rows);

//                 if(results.rows.length > 0) {
//                     errors.push({ message: "Email already registered!"});
//                     res.render("/unauthenticated/register", { errors });
//                 }
//             }
//         )
//     }
// })

module.exports = router;
