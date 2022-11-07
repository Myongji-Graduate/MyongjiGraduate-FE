import express from 'express';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();

const upload = multer({ dest: '../uploads/' });

const DEFAULT_HOST = 'http://ec2-15-165-61-122.ap-northeast-2.compute.amazonaws.com';
const PREFIX = '/api/v1';
const ROOT_URL = DEFAULT_HOST + PREFIX;

export async function validateAccessToken(req) {
	const accessToken = req.cookies.authorization;
	if (accessToken === undefined) return false;
	try {
		await axios.get(`${ROOT_URL}/auth/check-atk`, {
			headers: {
				Authorization: accessToken,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
}

export async function parsePDF(formData) {
	const response = await axios.post(
		'https://ig81au5s0j.execute-api.ap-northeast-2.amazonaws.com/mju-graduate/parse',
		formData,
		{
			headers: {
				...formData.getHeaders(),
			},
		}
	);
	return response.data;
}

function apiErrorHandler(res, error) {
	if (error.response.data.code) {
		return res.status(400).json(error.response.data);
	}
	return res.status(500).json({
		code: 500,
		message: '서버에 장애가 있습니다.',
	});
}

router.post('/file-upload', upload.single('file'), async function (req, res) {
	const formData = new FormData();
	formData.append('file', fs.createReadStream(req.file.path));

	try {
		const pdfText = await parsePDF(formData);

		// const response = await axios.post(`${ROOT_URL}/auth/sign-+in`, {
		// 	parsingText: pdfText,
		// });
		console.log(response);
		console.log(await response.text());
	} catch (error) {
		console.log(error);
		// apiErrorHandler(res, error);
	}
});

router.post('/signin', async function (req, res) {
	const formData = {
		userId: req.body.id,
		password: req.body.password,
	};

	try {
		const result = await axios.post(`${ROOT_URL}/auth/sign-in`, formData);
		res.cookie('authorization', result.headers.authorization, {
			httpOnly: true,
		});
		res.status(200).end();
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/check-atk', async function (req, res) {
	if (await validateAccessToken(req)) {
		res.status(200).end();
	} else {
		res.status(400).end();
	}
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
