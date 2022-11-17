import { makeError } from '../helper/errorHandler';

export async function fetchGetMyInfo() {
	const response = await fetch('/api/myInfo');

	if (response.status === 400 || response.status === 500) {
		throw await makeError(response);
	}

	const result = await response.json();
	return result;
}
