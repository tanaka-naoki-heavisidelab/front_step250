const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { overrideParams } = require('../utils/common.js');

router.get('/:taskId', async function (req, res, next) {
  try {

    const taskId = req.params.taskId;
    const today = new Date();
    const defaultParams = {
      title: 'タスク編集画面',
      baseUrl: process.env.BASE_URL,
      user: null,
      task: null
    };

    const headers = {
      'accept': 'application/json'
    };

    if (req.cookies && req.cookies.access_token) {
      headers['Cookie'] = 'access_token=' + req.cookies.access_token;
    }

    // FastAPIのエンドポイントを呼び出す
    // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
    // backendとfrontendが共通のdocker networkで接続されている前提。
    const response = await fetch(`http://nginx:80/fast/usertask/${taskId}`, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      const data = await response.json();
      res.render('update', overrideParams(defaultParams, { user: data.user, task: data.task }));
    } else {
      res.render('update', defaultParams);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;