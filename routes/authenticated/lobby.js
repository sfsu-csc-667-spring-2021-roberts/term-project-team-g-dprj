const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get("/:username", (req, res) => {
    res.render("authenticated/lobby", { username: req.params.username });
});

module.exports = router;
