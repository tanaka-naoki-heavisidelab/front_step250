const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

function overrideParams(params, newValues) {
  return {
    ...params,
    ...newValues
  };
}

router.get('/:taskId', async function (req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    const taskId = req.params.taskId;
    const today = new Date();
    const defaultParams = {
      title: 'タスク編集画面',
      baseUrl: process.env.BASE_URL,
      user: null,
      task: null
    };

    if (userToken) {
      // nginx:80…コンテナ間のSSRなのでlocalhostは使えない。
      // backendとfrontendが共通のdocker networkで接続されている前提。
      const response = await fetch(`http://nginx:80/fast/usertask/${taskId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // res.render('update',
        //   {
        //     title: 'タスク編集画面',
        //     baseUrl: process.env.BASE_URL,  
        //     user: data.user,
        //     task: data.task
        //   });
        res.render('update', overrideParams(defaultParams, { user: data.user, task: data.task }));
      } else {
        // res.render('update',
        //   {
        //     title: 'タスク編集画面',
        //     baseUrl: process.env.BASE_URL,
        //     user: "error",
        //     task: null
        //   });
        res.render('update', overrideParams(defaultParams, { user: "error" }));
      }
    } else {
      // res.render('update',
      //   {
      //     title: 'タスク編集画面',
      //     baseUrl: process.env.BASE_URL,
      //     user: null,
      //     task: null
      //   });
      res.render('update', defaultParams);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
