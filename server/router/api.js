import express from 'express';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();

const upload = multer({ dest: '../uploads/' });

function apiErrorHandler(res, error) {
	console.log('error', error);
	if (error.response.data.code) {
		return res.status(400).json(error.response.data);
	} else {
		return res.status(500).json({
			code: 500,
			message: '서버에 장애가 있습니다.',
		});
	}
}

router.get('/', function (req, res) {
	res.send('Birds home page');
});

router.post('/result', upload.single('file'), async function (req, res) {
	const formData = new FormData();

	formData.append('file', fs.createReadStream(req.file.path));

	formData.append('entryYear', req.body.studentNumber);
	formData.append('department', req.body.major);

	try {
		const result = await axios.post(
			'http://ec2-15-165-61-122.ap-northeast-2.compute.amazonaws.com/api/v1/graduation/result',
			formData,
			{
				headers: {
					...formData.getHeaders(),
				},
			}
		);
		console.log('result', result.data);
		res.json(result.data);
	} catch (error) {
		apiErrorHandler(error);
	}
});

router.post('/signin', async function (req, res) {
	const formData = new FormData();

	formData.append('userId', req.body.id);
	formData.append('password', req.body.password);

	try {
		setInterval(() => {
			res.json({
				"accessToken" : "accessToken", 
				"refreshToken" : "refreshToken" 
		});
		}, 1000);
	} catch (error) {
		apiErrorHandler(error);
	}
});


export default router;
