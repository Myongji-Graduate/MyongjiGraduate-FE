import { observable } from './observer';

export const createStore = (reducer, applyMiddleware) => {
	// state 초기화
	const state = observable(reducer());

	// 외부에 전달할 읽기 전용 state 생성
	const readableState = {};
	Object.keys(state).forEach((key) => {
		Object.defineProperty(readableState, key, {
			get() {
				return state[key];
			},
		});
	});

	const getState = () => readableState;

	const dispatch = (action) => {
		const newState = reducer(state, action);

		Object.entries(newState).forEach(([key, value]) => {
			if (state[key] !== undefined) {
				state[key] = value;
			}
		});
	};
	

	const getKeys = () => {
		return Object.keys(state);
	};

	const store = {
		getState,
		dispatch,
		getKeys,
	};

	return applyMiddleware(store);
};

export const applyMiddleware = (middlewares) => (store) => {
	middlewares = [...middlewares];
	middlewares = middlewares.reverse();

	let { dispatch } = store;
	middlewares.forEach((middleware) => {
		dispatch = middleware(store)(dispatch);
	});

	return { ...store, dispatch };
};
