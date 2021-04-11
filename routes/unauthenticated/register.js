var express = require('express');
var router = express.Router();

/* GET register listing. */
router.get("/", (req, res) => {
    res.render("unauthenticated/register");
});

module.exports = router;
