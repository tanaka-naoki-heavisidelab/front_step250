var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'ログイン画面', baseUrl: process.env.BASE_URL });
});

module.exports = router;