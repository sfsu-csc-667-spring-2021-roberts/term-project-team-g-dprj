const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get("/:id", (req, res) => {
    res.render("authenticated/game", { gameId: req.params.id });
});

module.exports = router;
