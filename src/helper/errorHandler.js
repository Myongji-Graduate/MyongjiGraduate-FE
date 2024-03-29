import { createAction, store } from '../store/store';
import { ERROR_ACTION_TYPES } from '../store/types';

export function showErrorModal(error) {
	store.dispatch(
		createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
			error,
		})
	);
}

export async function makeError(response) {
	const result = await response.json();
	const error = new Error(result.message);
	error.status = result.status;
	return error;
}

export async function handleErrorResponse(response) {
	const error = await response.json();
	showErrorModal(error);
}

export async function handleErrorObject(error) {
	showErrorModal({
		status: error.status,
		message: error.message,
	});
}
