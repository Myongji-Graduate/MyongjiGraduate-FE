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
		code: 100,
		message: '파일 형식이 pdf가 아닙니다.',
	},
	SEARCH_TEXT_LENGTH: {
		code: 101,
		message: '검색어를 2자리 이상 입력해주세요',
	},
	ALREADY_ADD_LECTURE: {
		code: 100,
		message: '이미 추가한 과목입니다.',
	},
	ALREADY_ADD_TAKEN: {
		code: 101,
		message: '이미 수강한 과목입니다.',
	},
};

export const SUCCESS_TYPES = {
	SIGN_UP: {
		code: 100,
		message: '회원가입에 성공하셨습니다.',
	},
	CUSTOM_LECTURE: {
		code: 101,
		message: '커스텀에 성공하셨습니다.',
	},
};
