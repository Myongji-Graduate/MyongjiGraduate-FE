import { createAction } from './store';
import { RESULT_ACTION_TYPES, SIGNIN_ACTION_TYPES } from './types';
import { parseGraduationResult } from '../helper/parse';

const ROOT_URL = 'https://1db2775e-5c12-4472-ba45-a118a0c06ef5.mock.pstmn.io/test'; // eslint-disable-line no-unused-vars

// export const fetchResult = (formData) => (dispatch, getState) => {
// 	dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_START));
// return fetch('/api/result', {
// 	method: 'POST',
// 	body: formData,
// })
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.then((result) => {
// 			if (result.code) {
// 				dispatch(
// 					createAction(RESULT_ACTION_TYPES.FETCH_RESULT_FAILED, {
// 						error: result,
// 					})
// 				);
// 			} else {
// 				const { router } = getState();
// 				const payload = parseGraduationResult(result);
// 				dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_SUCCESS, payload));
// 				router.navigate('/result');
// 			}
// 		});
// };

export const fetchSign = (formData) => (dispatch, getState) => {
	dispatch(createAction(SIGNIN_ACTION_TYPES.FETCH_SIGNIN_START));
	return fetch('/api/signin', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			if (result.code) {
				dispatch(
					createAction(SIGNIN_ACTION_TYPES.FETCH_SIGNIN_FAILED, {
						error: result,
					})
				);
			} else {
				const { router } = getState();
				// 토큰 저장
				dispatch(createAction(SIGNIN_ACTION_TYPES.FETCH_SIGNIN_SUCCESS));
			}
		});
};

// export const fetchMockApi = () => (dispatch, getState) => {
// 	dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_START));
// 	return fetch(ROOT_URL)
// 		.then((response) => {
// 			return response.json();
// 		})
// 		.then((result) => {
// 			const payload = parseGraduationResult(result);
// 			const { router } = getState();
// 			dispatch(createAction(RESULT_ACTION_TYPES.FETCH_RESULT_SUCCESS, payload));
// 			requestAnimationFrame(() => {
// 				router.navigate('/result');
// 			});
// 		});
// };
