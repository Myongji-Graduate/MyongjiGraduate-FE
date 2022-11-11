const AWS = require('aws-sdk');
const fs = require('fs');

const BUCKET = 'myongji-graduate-static';

const S3 = new AWS.S3({
	signatureVersion: 'v4',
	region: 'us-east-1', // 버킷을 생성한 리전 입력
});

const fileStream = fs.createReadStream('./dist/bundle.js');

const uploadParams = {
	Bucket: BUCKET,
	Key: 'build/bundle.js',
	Body: fileStream,
};

S3.upload(uploadParams, function (err, data) {
	console.log(err, data);
});
