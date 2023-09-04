var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get('/', async function (req, res, next) {
  const userToken = req.cookies.userToken;

  // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
  // backendとfrontendが共通のdocker networkで接続されている前提。
  if (userToken) {
    const response = await fetch('http://nginx:80/fast/usertasks', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });

    const today = new Date();

    if (response.ok) {
      const data = await response.json();
      res.render('user',
        {
          title: 'タスク一覧画面',
          baseUrl: process.env.BASE_URL,
          today: today,
          user: data.user,
          tasks: data.tasks
        });
    } else {
      res.render('user',
        {
          title: 'タスク一覧画面',
          baseUrl: process.env.BASE_URL,
          today: today,
          user: "error",
          tasks: null
        });
    }
  } else {
    res.render('user',
      {
        title: 'タスク一覧画面',
        baseUrl: process.env.BASE_URL,
        today: today,
        user: null,
        tasks: null
      });
  }
});

module.exports = router;
