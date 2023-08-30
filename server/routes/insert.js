var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('insert', { title: 'User Registration', baseUrl: process.env.BASE_URL });
});

module.exports = router;