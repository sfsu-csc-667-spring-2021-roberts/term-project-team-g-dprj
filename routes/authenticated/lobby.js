const express = require('express');
const router = express.Router();
const Games = require('../../db').Games;

router.get('/', (request, response) => {
  Promise.all([Games.allOpenGames(), Games.activeGames(request.user.id)])
    .then(([games, activeGames]) => {
      response.render('authenticated/lobby', {
        games: games.map((game) => ({ ...game, joinUrl: `/games/${game.id}/join` })),
        activeGames: activeGames.map((game) => ({ ...game, joinUrl: `/games/${game.id}/lobby` })),
      });
    })
    .catch((error) => response.json(error));
});

module.exports = router;
