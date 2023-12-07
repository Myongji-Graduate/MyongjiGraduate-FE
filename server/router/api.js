import express from 'express';
import multer from 'multer';
import FormData from 'form-data';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();

const upload = multer({ dest: '../uploads/' });

const DEFAULT_HOST = 'http://52.79.66.109:8080';
const PREFIX = '/api/v1';
const ROOT_URL = DEFAULT_HOST + PREFIX;

export function getAuthorizationCookie(req) {
	const accessToken = req.cookies.authorization;
	if (accessToken === undefined) return 'null';
	return accessToken;
}

export async function validateAccessToken(req) {
	const accessToken = getAuthorizationCookie(req);
	if (accessToken === undefined) return false;
	try {
		await axios.get(`${ROOT_URL}/auth/token`, {
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

export async function validateStudentNumber({ studentNumber }) {
	const response = await axios.get(
		`${ROOT_URL}/users/sign-up/check-duplicate-student-number?student-number=${studentNumber}`
	);
	return !response.data.notDuplicated;
}

export async function validateUserId({ userId }) {
	const response = await axios.get(`${ROOT_URL}/users/sign-up/check-duplicate-auth-id?auth-id=${userId}`);
	return !response.data.notDuplicated;
}

function apiErrorHandler(res, error) {
	console.log(error);
	if (error.response?.data.status) {
		return res.status(400).json(error.response.data);
	}
	return res.status(500).json({
		status: 500,
		message: '서버에 장애가 있습니다.',
	});
}

router.post('/file-upload', upload.single('file'), async function (req, res) {
	const formData = new FormData();
	formData.append('file', fs.createReadStream(req.file.path));

	try {
		const pdfText = await parsePDF(formData);

		const accessToken = getAuthorizationCookie(req);
		const response = await axios.post(
			`${ROOT_URL}/parsing-text`,
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
		authId: req.body.authId,
		password: req.body.password,
	};

	try {
		const result = await axios.post(`${ROOT_URL}/auth/sign-in`, formData);
		res.cookie('authorization', result.data.accessToken, {
			httpOnly: true,
		});
		const response = await axios.get(`${ROOT_URL}/users/me/init`, {
			headers: {
				Authorization: result.data.accessToken,
			},
		});
		console.log({ isInit: response.data.init });
		res.status(200).json({ isInit: response.data.init });
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/signout', function (req, res) {
	res.cookie('authorization', null, {
		httpOnly: true,
		maxAge: 0,
	});
	res.status(200).end();
});

router.post('/signup', async function (req, res) {
	const formData = {
		authId: req.body.id,
		password: req.body.password,
		studentNumber: req.body.studentId,
		engLv: req.body.englishLevel,
	};

	try {
		if (await validateUserId({ userId: req.body.id }))
			return res.status(400).json({
				status: 400,
				message: '이미 아이디가 존재합니다.',
			});

		if (await validateStudentNumber({ studentNumber: req.body.studentId }))
			return res.status(400).json({
				status: 400,
				message: '이미 등록된 학번입니다.',
			});

		const result = await axios.post(`${ROOT_URL}/users/sign-up`, formData);
		res.status(200).end();
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.post('/secession', async function (req, res) {
	const formData = {
		password: req.body.password,
	};
	const accessToken = getAuthorizationCookie(req);
	try {
		const result = await axios.delete(`${ROOT_URL}/users`, formData, {
			headers: {
				Authorization: accessToken,
			},
		});
		res.status(200).end();
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.post('/userConfirm', async function (req, res) {
	console.log('비밀번호 재설정');
	const formData = {
		authId: req.body.authId,
		studentNumber: req.body.studentNumber,
	};
	try {
		await axios.get(`${ROOT_URL}/users/${formData.studentNumber}/validate`, formData, {
			headers: {
				'Content-Type': 'application/json',
			},
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
		const accessToken = getAuthorizationCookie(req);
		const result = await axios.get(`${ROOT_URL}/taken-lectures`, {
			headers: {
				Authorization: accessToken,
			},
		});
		res.status(200).json(result.data);
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/search-lecture', async function (req, res) {
	try {
		const accessToken = getAuthorizationCookie(req);
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
		const accessToken = getAuthorizationCookie(req);
		const result = await axios.post(`${ROOT_URL}/taken-lectures/update`, formData, {
			headers: {
				Authorization: accessToken,
			},
		});

		res.status(200).end();
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/myInfo', async function (req, res) {
	try {
		const accessToken = getAuthorizationCookie(req);
		if (accessToken === 'null') {
			res.status(500).json({
				status: 500,
				message: '서버에 장애가 있습니다.',
			});
		} else {
			const result = await axios.get(`${ROOT_URL}/users`, {
				headers: {
					Authorization: accessToken,
				},
			});
			res.status(200).json(result.data);
		}
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/graduation-result', async function (req, res) {
	try {
		const accessToken = getAuthorizationCookie(req);
		const result = await axios.get(`${ROOT_URL}/graduation/result`, {
			headers: {
				Authorization: accessToken,
			},
		});
		res.status(200).json(result.data);
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/findId', async function (req, res) {
	try {
		const path = req._parsedUrl.query;
		const response = await axios.get(`${ROOT_URL}/users/${path}/auth-id`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		res.status(200).json(response.data);
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.post('/findPw', async function (req, res) {
	const formData = {
		authId: req.body.userId,
		newPassword: req.body.newPassword,
		passwordCheck: req.body.passwordCheck,
	};
	try {
		const result = await axios.patch(`${ROOT_URL}/users/password`, formData);
		res.status(200).end();
	} catch (error) {
		apiErrorHandler(res, error);
	}
});

router.get('/check-user', async function (req, res) {
	const accessToken = req.cookies.authorization;
	if (accessToken === undefined) {
		res.status(400).end();
	} else {
		try {
			const response = await axios.get(`${ROOT_URL}/health`, {
				headers: {
					Authorization: accessToken,
				},
			});
			res.status(200).json(response.data);
		} catch (error) {
			apiErrorHandler(res, error);
		}
	}
});

export default router;
