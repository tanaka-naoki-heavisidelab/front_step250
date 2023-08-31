var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const errors = ['エラー1', 'エラー2'];
  res.render('home', { title: 'ホーム画面', errors: errors });
});

module.exports = router;