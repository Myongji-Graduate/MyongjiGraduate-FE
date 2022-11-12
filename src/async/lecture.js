import { handleErrorResponse, makeError } from '../helper/errorHandler';
import { objectToQueryString } from '../helper/utils';

export async function fetchGetSearchedLecture(query) {
	const queryString = objectToQueryString(query);
	const response = await fetch(`/api/search-lecture?${queryString}`);

	if (response.status === 400 || response.status === 500) {
		const result = await response.json();
		const error = new Error(result.message);
		error.code = result.code;
		throw error;
	}

	const result = await response.json();
	return result;
}

export async function fetchUpdateTakenLecture(formData) {
	const response = await fetch('/api/update-lecture', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.status === 400 || response.status === 500) {
		throw await makeError(response);
	}

	return false;
}

export async function fetchGetTakenLectures() {
	const response = await fetch('/api/takenLectures');

	if (response.status === 400 || response.status === 500) {
		throw await makeError(response);
	}

	const result = await response.json();
	return result;
}
