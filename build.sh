#!/bin/bash
npm install http-server nodemon
#以下スクリプトが無ければpackage.jsonに追記。
#あればそのままマージされる。
  # "scripts": {
  #   "start": "http-server ./ -p 3000"
  # }
npm start
# tail -f /dev/null