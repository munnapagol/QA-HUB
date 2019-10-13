var express = require('express');
var router = express.Router();

const { authenticated } = require('../config/authenticate');

/* GET home page. */
router.get('/', authenticated, function (req, res, next) {
  res.render('index', { oauth: false });
});

module.exports = router;
