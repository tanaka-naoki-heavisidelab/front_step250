const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/:taskId', async function (req, res, next) {
  try {

    const taskId = req.params.taskId;

    const headers = {
      'accept': 'application/json'
    };

    if (req.cookies && req.cookies.access_token) {
      headers['Cookie'] = 'access_token=' + req.cookies.access_token;
    }

    // FastAPIのエンドポイントを呼び出す
    // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
    // backendとfrontendが共通のdocker networkで接続されている前提。  
    const response = await fetch(`http://nginx:80/fast/usertask/delete/${taskId}`, {
      method: 'GET',
      headers: headers
    });

    if (response.ok) {
      // FastAPIからのレスポンスが正常な場合の処理
      res.redirect('/user');  // 適切なページにリダイレクト
    } else {
      // エラーレスポンスが帰ってきた場合の処理
      res.status(response.status).send('Error from FastAPI');
    }

  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
