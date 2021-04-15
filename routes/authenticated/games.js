const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/:id", (request, response) => {
  response.render("authenticated/game", { gameId: request.params.id });
});

router.get("/:id/lobby", (request, response) => {
  response.render("authenticated/game-lobby", { gameId: request.params.id });
});

module.exports = router;
