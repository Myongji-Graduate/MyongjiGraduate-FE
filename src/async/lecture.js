import { handleErrorResponse } from '../helper/errorHandler';
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

export function a() {}
