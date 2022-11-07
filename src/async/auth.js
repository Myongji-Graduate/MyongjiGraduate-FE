import { handleErrorResponse } from '../helper/errorHandler';

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

// export async function fetchValidateId() {
// 	const response = await fetch('/api/userid');
// 	if (response.status === 200) return true;
// 	if (response.status === 400) return false;
// 	return false;
// }

// export async function fetchValidateStudentId() {
// 	const response = await fetch('/api/studentNumber');
// 	if (response.status === 200) return true;
// 	if (response.status === 400) return false;
// 	return false;
// }
