import { createStore, applyMiddleware } from '../core/store';
import { thunk, logger } from '../core/middleware';
import { RESULT_ACTION_TYPES, ERROR_ACTION_TYPES, SIGNIN_ACTION_TYPES } from './types';

const initState = {
	test: 'ok',
	router: () => {},
	isLoadingModalShow: false,
	error: { code: null, message: null },
	basicUserInfo: null,
	categoryList: null,
};

export const actionType = {
	test: 'test',
	enrollRouter: 'enroll-router',
};

export const reducer = (state = initState, action = {}) => {
	const { type, payload } = action;
	switch (type) {
		case actionType.test:
			return { ...state, test: 'no' };
		case actionType.enrollRouter:
			return { ...state, router: payload.router };
		case SIGNIN_ACTION_TYPES.FETCH_SIGNIN_START:
			return { ...state, isLoadingModalShow: true };
		case SIGNIN_ACTION_TYPES.FETCH_SIGNIN_SUCCESS:
			return { ...state, isLoadingModalShow: false };
		case SIGNIN_ACTION_TYPES.FETCH_SIGNIN_FAILED:
			return { ...state, isLoadingModalShow: false, error: payload.error };
		case ERROR_ACTION_TYPES.HIDE_ERROR:
			return {
				...state,
				error: {
					code: null,
					message: null,
				},
			};
		case ERROR_ACTION_TYPES.SHOW_ERROR:
			return { ...state, error: payload.error };
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware([thunk, logger]));

export const createAction = (type, payload) => ({
	type,
	payload,
});
