import { handleErrorResponse } from '../helper/errorHandler';
import { showSuccessModal } from '../helper/successHandler';
import { SUCCESS_TYPES } from '../store/types';
import { signIn, init, signOut, unInit } from '../helper/auth';
// import { objectToQueryString } from '../helper/utils';

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

export async function fetchSecession(formData) {
	const response = await fetch('/api/secession', {
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

export async function fetchId(studentId) {
	const response = await fetch(`/api/findId?${studentId}`, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.status === 400 || response.status === 500) {
		handleErrorResponse(response);
	}
	if (response.status === 200) {
		const result = await response.json();
		return result;
	}
	return false;
}

export async function fetchPw(formData) {
	const response = await fetch('/users/password', {
		method: 'PATCH',
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

export async function fetchUserConfirm(formData) {
	const response = await fetch('/api/userConfirm', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.status === 200) {
		return true;
	}
	handleErrorResponse(response);
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

export async function fetchValidateUser() {
	const response = await fetch('/api/check-user');

	if (response.status === 200) {
		const result = await response.json();

		if (result.validToken) {
			signIn();
		} else {
			signOut();
		}

		if (result.init) {
			init();
		} else {
			unInit();
		}

		return result;
	}

	signOut();
	unInit();

	return {
		validToken: false,
		init: false,
	};
}
