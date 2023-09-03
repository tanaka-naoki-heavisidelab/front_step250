var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get(['/', '/home'], async function (req, res, next) {
  const userToken = req.cookies.userToken;

  // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
  // backendとfrontendが共通のdocker networkで接続されている前提。
  if (userToken) {
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
  } else {
    res.render('home', { title: 'ホーム画面', user: null });
  }
});

module.exports = router;