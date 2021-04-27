const express = require('express');
const router = express.Router();
const Games = require('../../db').Games;

router.get('/', (request, response) => {
  Games.allOpenGames()
    .then((games) => {
      response.render('authenticated/lobby', {
        games: games.map((game) => ({ ...game, joinUrl: `/games/${game.id}/join` })),
      });
    })
    .catch((error) => response.json(error));
});

module.exports = router;
