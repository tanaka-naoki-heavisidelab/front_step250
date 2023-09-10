const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { overrideParams } = require('../utils/common.js');

router.get(['/', '/home'], async function (req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    const defaultParams = {
      title: 'ホーム画面',
      baseUrl: process.env.BASE_URL,
      user: null
    };

    if (userToken) {
      // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
      // backendとfrontendが共通のdocker networkで接続されている前提。
      const response = await fetch('http://nginx:80/fast/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        res.render('home', overrideParams(defaultParams, { user: data.username }));
      } else {
        res.render('home', overrideParams(defaultParams, { user: "error" }));
      }
    } else {
      res.render('home', defaultParams);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;