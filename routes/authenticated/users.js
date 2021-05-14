const express = require('express');
const router = express.Router();

router.get('/whoami', (request, response) => {
  response.json(request.user);
});

module.exports = router;
