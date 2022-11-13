import { handleErrorResponse } from '../helper/errorHandler';
import { showSuccessModal } from '../helper/successHandler';
import { SUCCESS_TYPES } from '../store/types';
import { signIn, init, signOut, unInit } from '../helper/auth';

export async function fetchSignIn(formData) {
	const response = await fetch('/api/signin', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 200) {
		signIn();
		const result = await response.json();
		if (result.isInit) {
			init();
		}
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

	if (response.status === 200) {
		signIn();
		return true;
	}
	if (response.status === 400) {
		signOut();
		return false;
	}
	return false;
}

export async function fetchValidateInit() {
	const response = await fetch('/api/check-init');

	if (response.status === 200) {
		init();
		return true;
	}
	if (response.status === 400) {
		unInit();
	}
	return false;
}
