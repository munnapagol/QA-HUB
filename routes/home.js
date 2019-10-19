var express = require('express');
var router = express.Router();

const { ensureAuth } = require('../config/authenticate');

/* GET home page. */
router.get('/dashboard', ensureAuth, function (req, res, next) {
    res.render('dashboard', { oauth: true });
});

router.get('/search-qa', ensureAuth, function (req, res, next) {
    res.render('search_qa', { oauth: true });
});

module.exports = router;
