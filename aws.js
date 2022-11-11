const AWS = require('aws-sdk');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const BUCKET = 'myongji-graduate-static';

const S3 = new AWS.S3({
	signatureVersion: 'v4',
	region: 'us-east-1', // 버킷을 생성한 리전 입력
});

const fileStream = fs.createReadStream('./dist/bundle.js');
const out = fs.createWriteStream('./dist/bundle.js.gz');

fileStream
	.pipe(gzip)
	.pipe(out)
	.on('finish', () => {
		const gzipFile = fs.createReadStream('./dist/bundle.js.gz');
		const uploadParams = {
			Bucket: BUCKET,
			Key: 'build/bundle.js.gz',
			Body: gzipFile,
			ACL: 'public-read',
			ContentEncoding: 'gzip',
		};

		S3.upload(uploadParams, function (err, data) {
			console.log(err, data);
		});
	});
