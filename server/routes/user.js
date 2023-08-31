var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const username = req.query.username;
  const email = req.query.email;
  res.render('user', { title: 'ユーザー表示', user: { username: username, email: email } });
});

module.exports = router;