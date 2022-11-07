export function convertPXToREM(px) {
	return Math.round((px / 48) * 100) / 100;
}

export function getInlineStyle(styleObject) {
	return Object.entries(styleObject).reduce((acc, [key, value]) => {
		return `${acc}${key}:${value};`;
	}, '');
}

export function objectToQueryString(object) {
	const queryString = Object.keys(object).reduce((acc, key) => {
		return `${acc}${key}=${object[key]}&`;
	}, '');

	return queryString.slice(0, queryString.length - 1);
}
