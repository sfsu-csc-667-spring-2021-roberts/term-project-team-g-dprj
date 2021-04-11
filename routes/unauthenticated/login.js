var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get("/", (req, res) => {
    res.render("unauthenticated/login");
});

module.exports = router;
