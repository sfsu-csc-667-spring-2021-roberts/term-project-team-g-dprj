const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (request, response) => {
  response.render("unauthenticated/home", {
    username: request.params.username,
  });
});

module.exports = router;
