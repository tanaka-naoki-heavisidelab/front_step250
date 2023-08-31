var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register', { title: 'ユーザー情報登録画面', baseUrl: process.env.BASE_URL });
});

module.exports = router;