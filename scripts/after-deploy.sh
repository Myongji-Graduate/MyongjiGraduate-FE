#!/bin/bash
REPOSITORY=/home/ec2-user/build

cd $REPOSITORY

sudo /usr/bin/npm install

sudo /usr/bin/npm run build:production

sudo /usr/bin/pm2 start -f ./be/bundle.js