import { createStore, applyMiddleware } from '../core/store';
import { thunk, logger } from '../core/middleware';

const initState = {
	test: 'ok',
	router: () => {},
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
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware([thunk, logger]));

export const createAction = (type, payload) => ({
	type,
	payload,
});