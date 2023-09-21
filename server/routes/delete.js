const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/:taskId', async function (req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    const taskId = req.params.taskId;
    if (userToken) {
      const response = await fetch(`http://nginx:80/fast/usertask/delete/${taskId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        // FastAPIからのレスポンスが正常な場合の処理
        res.redirect('/user');  // 適切なページにリダイレクト
      } else {
        // エラーレスポンスが帰ってきた場合の処理
        res.status(response.status).send('Error from FastAPI');
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
