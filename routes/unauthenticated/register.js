const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { pool } = require('../../config/config')

/* GET register listing. */
router.get("/", (req, res) => {
    res.render("unauthenticated/register");
});

router.post("/unauthenticated/register", async (req,res) => {
    let { name, email, password, password2 } = req.body;

    console.log({
        name, 
        email, 
        password, 
        password2
    });

    let errors = []

    if(!name || !email || !password || !password2) {
        errors.push({ message: 'Please enter all fields'});
    }

    if(password.length < 8) {
        errors.push({ message:'Password must be at least 8 characters'});
    }

    if(password != password2) {
        errors.push({ message:'Passwords do not match'});
    }

    if(errors.length > 0) {
        res.render("unauthenticated/register", { errors });
    } else {

        // validate password
        let hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email $1`, 
            [email],
            (err, results) => {
                if(err){
                    throw err;
                }
                console.log(results.rows);

                if(results.rows.length > 0) {
                    errors.push({ message: "Email already registered!"});
                    res.render("unauthenticated/register", { errors });
                }
            }
        )
    }
})

module.exports = router;
