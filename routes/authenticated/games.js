const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const Games = require('../../db').Games;

router.get('/:id', (request, response) => {
  const { id } = request.params;

  Games.findById(id)
    .then((game) => {
      if (game.players.length < game.number_of_players) {
        response.redirect(`/games/${id}/lobby`);
        Promise.reject('done');
      } else {
        return game;
      }
    })
    .then((game) => {
      response.render('authenticated/game', { gameId: request.params.id });
    })
    .catch((error) => console.log(error));
});

router.get('/:id/lobby', (request, response) => {
  const { id } = request.params;

  Games.findById(id)
    .then((game) => {
      console.log(game);
      return game;
    })
    .then((game) => response.render('authenticated/game-lobby', { ...game }));
});

module.exports = router;
