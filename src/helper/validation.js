export function validateshortlength(text, i) {
	return text.length < i;
}

export function validatelonglength(text, i) {
	return text.length > i;
}

export function validateLength(text, i) {
	return text.length !== i;
}

export function validateReconfirm(text1, text2) {
	return text1 !== text2;
}

export function validateOnlyNumber(text) {
	return text.search(/^[0-9]+$/);
}

export function validatespecialSymbol(text) {
	return text.search(/[!@#$%^&*]/gi) < 0;
}
