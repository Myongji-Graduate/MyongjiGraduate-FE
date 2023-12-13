#!/bin/bash
REPOSITORY=/home/ec2-user/build

cd $REPOSITORY

sudo /usr/bin/pm2 kill

sudo /usr/bin/npm install

npm run build:production

sudo /usr/bin/node ./aws.js

sudo /usr/bin/pm2 start -f ./be/bundle.js
