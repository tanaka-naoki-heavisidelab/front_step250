const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { overrideParams } = require('../utils/common.js');

router.get('/', async function (req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    const today = new Date();
    const defaultParams = {
      title: 'タスク一覧画面',
      baseUrl: process.env.BASE_URL,
      today: today,
      user: null,
      tasks: null
    };

    if (userToken) {
      // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
      // backendとfrontendが共通のdocker networkで接続されている前提。
      const response = await fetch('http://nginx:80/fast/usertasks', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        res.render('user', overrideParams(defaultParams, { user: data.user, tasks: data.tasks }));
      } else {
        res.render('user', overrideParams(defaultParams, { user: "error", tasks: null }));
      }
    } else {
      res.render('user', defaultParams);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
