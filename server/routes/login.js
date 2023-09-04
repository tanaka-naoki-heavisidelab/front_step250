var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
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
        res.render('login', { title: 'ログイン画面', baseUrl: process.env.BASE_URL, user: data.username });
      } else {
        res.render('login', { title: 'ログイン画面', baseUrl: process.env.BASE_URL, user: "error" });
      }
    } else {
      res.render('login', { title: 'ログイン画面', baseUrl: process.env.BASE_URL, user: null });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
