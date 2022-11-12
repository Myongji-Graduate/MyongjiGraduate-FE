import { makeError } from '../helper/errorHandler';

export async function fetchPDFFileUpload(formData) {
	const response = await fetch('/api/file-upload', {
		method: 'POST',
		body: formData,
	});

	if (response.status === 400 || response.status === 500) {
		throw await makeError(response);
	}
}
