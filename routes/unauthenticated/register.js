const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = []

/* GET register listing. */
router.get("/", (req, res) => {
    res.render("unauthenticated/register");
});

router.post("/register", async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now.toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            confirmPassword: hashedPassword
        });
        res.redirect("/login");
    } catch (error) {
        res.redirect("/register");
    }
    console.log(users);
})

module.exports = router;
