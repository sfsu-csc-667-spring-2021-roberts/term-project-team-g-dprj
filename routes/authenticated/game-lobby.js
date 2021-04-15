const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/', (request, response) => {
  response.render('authenticated/game-lobby');
});

module.exports = router;
