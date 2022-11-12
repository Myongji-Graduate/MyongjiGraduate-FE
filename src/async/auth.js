import { handleErrorResponse } from '../helper/errorHandler';
import { showSuccessModal } from '../helper/successHandler';
import { SUCCESS_TYPES } from '../store/types';

export async function fetchSignIn(formData) {
	const response = await fetch('/api/signin', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		return true;
	}

	if (response.status === 400) {
		handleErrorResponse(response);
		return false;
	}

	return false;
}

export async function fetchSignUp(formData) {
	const response = await fetch('/api/signup', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		showSuccessModal(SUCCESS_TYPES.SIGN_UP);
		return true;
	}

	if (response.status === 400) {
		handleErrorResponse(response);
		return false;
	}

	return false;
}

export async function fetchValidateATK() {
	const response = await fetch('/api/check-atk');

	if (response.status === 200) return true;
	if (response.status === 400) return false;
	return false;
}
