const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { overrideParams } = require('../utils/common.js');

router.get(['/', '/home'], async function (req, res, next) {
  try {

    const defaultParams = {
      title: 'ホーム画面',
      baseUrl: process.env.BASE_URL,
      user: null
    };

    const headers = {
      'accept': 'application/json'
    };

    if (req.cookies && req.cookies.access_token) {
      headers['Authorization'] = 'Bearer ' + req.cookies.access_token;
    }

    // FastAPIのエンドポイントを呼び出す
    // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
    // backendとfrontendが共通のdocker networkで接続されている前提。
    const response = await fetch('http://nginx:80/fast/user', {
      method: 'GET',
      headers: headers
    });

    // console.log("Response Status:", response.status);
    // console.log("Response Status Text:", response.statusText);

    // for (let [key, value] of response.headers.entries()) {
    //   console.log(key, value);
    // }

    // if (response.headers.get('content-type').includes('application/json')) {
    //   const data = await response.json();
    //   console.log("Response Body:", data);
    // } else {
    //   const text = await response.text();
    //   console.log("Response Body:", text);
    // }

    if (response.ok) {
      const data = await response.json();
      res.render('home', overrideParams(defaultParams, { user: data.username }));
    } else {
      res.render('home', defaultParams);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;