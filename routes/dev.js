const express = require('express');
const router = express.Router();
const Games = require('../db').Games;

router.get('/', (request, response) => {
  response.render('dev');
});

router.get('/create-game', (request, response) => {
  Games.create(`test-game-${Math.floor(Math.random() * 10000)}`, 2, 11).then(({ id }) =>
    response.redirect(`/games/${id}`)
  );
});

module.exports = router;
