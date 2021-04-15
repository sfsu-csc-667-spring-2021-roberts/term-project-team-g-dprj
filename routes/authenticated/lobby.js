const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get("/", (request, response) => {
  response.render("authenticated/lobby");
});

module.exports = router;
