import { createAction, store } from '../store/store';
import { ERROR_ACTION_TYPES } from '../store/types';

export function showErrorModal(error) {
	store.dispatch(
		createAction(ERROR_ACTION_TYPES.SHOW_ERROR, {
			error,
		})
	);
}

export async function handleErrorResponse(response) {
	const error = await response.json();
	showErrorModal(error);
}
