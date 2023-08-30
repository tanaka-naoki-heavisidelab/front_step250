var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const username = req.query.username;
  res.render('users', { title: 'Display User Name', users: { username: username } });
});

module.exports = router;