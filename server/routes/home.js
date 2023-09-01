var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'ホーム画面', user: "only / " });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  const userToken = req.cookies.userToken;


  res.render('home', { title: 'ホーム画面', user: userToken });
});

module.exports = router;