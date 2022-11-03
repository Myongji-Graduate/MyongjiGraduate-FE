import express from 'express';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();

const upload = multer({ dest: '../uploads/' });

function apiErrorHandler(res, error) {
	if (error.response.data.code) {
		return res.status(400).json(error.response.data);
	}
	return res.status(500).json({
		code: 500,
		message: '서버에 장애가 있습니다.',
	});
}


router.post('/result', upload.single('file'), async function (req, res) {
	const formData = new FormData();
	formData.append('file', fs.createReadStream(req.file.path));

	try {
		const result = await axios.post(
			//'http://ec2-15-165-61-122.ap-northeast-2.compute.amazonaws.com/api/v1/graduation/result',
			'https://ig81au5s0j.execute-api.ap-northeast-2.amazonaws.com/mju-graduate/parse',
			formData,
			{
				headers: {
					...formData.getHeaders(),
				},
			}
		);
		res.json(result.data);		
		console.log(JSON.stringify(result.data));
	} catch (error) {
		console.log(error.response);
		apiErrorHandler(res, error);
	}
});

router.post('/signin', function (req, res) {
	console.log(req.body);
	const formData = new FormData();

	// formData.append('userId', req.body.id);
	// formData.append('password', req.body.password);

	res.json({
		accessToken: 'accessToken',
		refreshToken: 'refreshToken',
	});
	// setInterval(() => {
	// 	res.json({
	// 		"accessToken" : "accessToken",
	// 		"refreshToken" : "refreshToken"
	// });
	// }, 1000);
	// try {

	// } catch (error) {
	// 	apiErrorHandler(res, error);
	// }
});

router.get('/takenLectures', async function (req, res) {
	try {
		const result = await axios.get(
			'https://b0182694-3460-46e7-97ce-3aceba5200ad.mock.pstmn.io/users/%7Bid%7D/taken-lectures?id'
		);
		res.json(result.data);
	} catch (error) {
		apiErrorHandler(res, error);
	}
});


export default router;
