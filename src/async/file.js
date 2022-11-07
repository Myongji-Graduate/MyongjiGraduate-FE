export async function fetchPDFFileUpload(formData) {
	const response = await fetch('/api/file-upload', {
		method: 'POST',
		body: formData,
	});

	console.log(response);
}
