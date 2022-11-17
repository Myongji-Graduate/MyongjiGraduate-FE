import { createAction, store } from '../store/store';
import { SUCCESS_ACTION_TYPES } from '../store/types';

export function showSuccessModal(success) {
	store.dispatch(
		createAction(SUCCESS_ACTION_TYPES.SHOW_SUCCESS, {
			success,
		})
	);
}
