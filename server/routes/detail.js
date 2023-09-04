var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

router.get('/:taskId', async function (req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    const taskId = req.params.taskId;
    const today = new Date();
    // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
    // backendとfrontendが共通のdocker networkで接続されている前提。
    if (userToken) {
      const response = await fetch(`http://nginx:80/fast/usertask/${taskId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        res.render('detail',
          {
            title: 'タスク詳細画面',
            baseUrl: process.env.BASE_URL,
            today: today,
            user: data.user,
            task: data.task
          });
      } else {
        res.render('detail',
          {
            title: 'タスク詳細画面',
            baseUrl: process.env.BASE_URL,
            today: today,
            user: "error",
            task: null
          });
      }
    } else {
      res.render('detail',
        {
          title: 'タスク詳細画面',
          baseUrl: process.env.BASE_URL,
          today: today,
          user: null,
          task: null
        });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
