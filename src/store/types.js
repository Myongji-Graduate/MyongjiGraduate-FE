export const ERROR_ACTION_TYPES = {
	SHOW_ERROR: 'error/SHOW_ERROR',
	HIDE_ERROR: 'error/HIDE_ERROR',
};

export const SUCCESS_ACTION_TYPES = {
	SHOW_SUCCESS: 'sucess/SHOW_SUCCESS',
	HIDE_SUCCESS: 'sucess/HIDE_SUCCESS',
};

export const SIGNIN_ACTION_TYPES = {
	FETCH_SIGNIN_START: 'signin/FETCH_SIGNIN_START',
	FETCH_SIGNIN_SUCCESS: 'signin/FETCH_SIGNIN_SUCCESS',
	FETCH_SIGNIN_FAILED: 'signin/FETCH_SIGNIN_FAILED',
};

export const ERROR_TYPES = {
	FILE_EXTENSTION: {
		status: 100,
		message: '파일 형식이 pdf가 아닙니다.',
	},
	SEARCH_TEXT_LENGTH: {
		status: 101,
		message: '검색어를 2자리 이상 입력해주세요',
	},
	ALREADY_ADD_LECTURE: {
		status: 100,
		message: '이미 추가한 과목입니다.',
	},
	ALREADY_ADD_TAKEN: {
		status: 101,
		message: '이미 수강한 과목입니다.',
	},
	NULL_INPUT_VALUE: {
		status: 100,
		message: '입력하지 않은 값이 존재합니다.',
	},
};

export const SUCCESS_TYPES = {
	SIGN_UP: {
		status: 100,
		message: '회원가입에 성공하셨습니다.',
	},
	CUSTOM_LECTURE: {
		status: 101,
		message: '커스텀에 성공하셨습니다.',
	},
};
