var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('unauthenticated/home', { username: req.params.username });
});

module.exports = router;
