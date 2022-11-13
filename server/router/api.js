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

export async function validateInit(req) {
	const accessToken = req.cookies.authorization;
	if (accessToken === undefined) return false;
	try {
		const response = await axios.get(`${ROOT_URL}/users/me/init`, {
			headers: {
				Authorization: accessToken,
			},
		});
		return response.data.init;
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

export async function validateStudentNumber(formData) {
	const response = await axios.post(`${ROOT_URL}/users/studentNumber-validity-checks`, formData);
	return !response.data.isNotDuplicated;
}

export async function validateUserId(formData) {
	const response = await axios.post(`${ROOT_URL}/users/userid-validity-checks`, formData);
	return !response.data.isNotDuplicated;
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

		const accessToken = req.cookies.authorization;
		const response = await axios.post(
			`${ROOT_URL}/users/me/taken-lectures`,
			{
				parsingText: pdfText,
			},
			{
				headers: {
					Authorization: accessToken,
				},
			}
		);
		res.status(200).json(response.data);
	} catch (error) {
		apiErrorHandler(res, error);
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

		const response = await axios.get(`${ROOT_URL}/users/me/init`, {
			headers: {
				Authorization: result.headers.authorization,
			},
		});
		res.status(200).json({ isInit: response.data.init });
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/signout', function (req, res) {
	res.cookie('authorization', 'logout', {
		httpOnly: true,
	});
	res.status(200).end();
});

router.post('/signup', async function (req, res) {
	const formData = {
		userId: req.body.id,
		password: req.body.password,
		studentNumber: req.body.studentId,
		engLv: req.body.eglishLevel,
	};

	try {
		if (await validateUserId({ userId: req.body.id }))
			return res.status(400).json({
				code: 400,
				message: '이미 아이디가 존재합니다.',
			});

		if (await validateStudentNumber({ studentNumber: req.body.studentId }))
			return res.status(400).json({
				code: 400,
				message: '이미 등록된 학번입니다.',
			});

		const result = await axios.post(`${ROOT_URL}/auth/sign-up`, formData);
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
		const accessToken = req.cookies.authorization;
		const result = await axios.get(`${ROOT_URL}/users/me/taken-lectures`, {
			headers: {
				Authorization: accessToken,
			},
		});
		res.status(200).json(result.data);
		// res.json(result.data);
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/search-lecture', async function (req, res) {
	try {
		const accessToken = req.cookies.authorization;
		const response = await axios.get(`${ROOT_URL}/lectures`, {
			headers: {
				Authorization: accessToken,
			},
			params: req.query,
		});
		res.status(200).json({
			searchedLectures: response.data,
		});
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.post('/update-lecture', async function (req, res) {
	const formData = {
		deletedTakenLectures: req.body.deletedTakenLectures,
		addedTakenLectures: req.body.addedTakenLectures,
	};

	try {
		const accessToken = req.cookies.authorization;
		const result = await axios.patch(`${ROOT_URL}/users/me/taken-lectures`, formData, {
			headers: {
				Authorization: accessToken,
			},
		});
		console.log(result);

		res.status(200).end();
	} catch (error) {
		console.log(error);
		apiErrorHandler(res, error);
	}
});

router.get('/myInfo', async function (req, res) {
	try {
		const accessToken = req.cookies.authorization;
		const result = await axios.get(`${ROOT_URL}/users/me/information`, {
			headers: {
				Authorization: accessToken,
			},
		});
		res.status(200).json(result.data);
		console.log(result)
	} catch (error) {
		apiErrorHandler(res, error);
	}
});
export default router;
