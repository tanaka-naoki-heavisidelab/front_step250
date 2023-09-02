var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();
const baseUrl = process.env.BASE_URL;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'ホーム画面', baseUrl: process.env.BASE_URL, user: "only / " });
});

/* GET home page. */
router.get('/home', async function (req, res, next) {
  const userToken = req.cookies.userToken;
  const response = await fetch('http://nginx:80/fast/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  });

  if (response.ok) {
    const data = await response.json();
    res.render('home', { title: 'ホーム画面', user: data.username });
  } else {
    res.render('home', { title: 'ホーム画面', user: "error" });
  }
});

module.exports = router;