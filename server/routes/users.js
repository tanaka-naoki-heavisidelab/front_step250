var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('users', { users: ['John', 'Jane', 'Jack'] });
});

module.exports = router;
