export function getSizesAttr(sizes) {
	const { mobile, tablet, sm, md, lg } = sizes;

	const sizesAttr = `
    (max-width: 649px) ${mobile}px,
    (max-width: 1007px) ${tablet}px,
    (max-width: 1439px) ${sm}px,
    (max-width: 1919px) ${md}px,
    ${lg}px,
  `;

	return sizesAttr;
}

export function getSrcsetAttr(sizes, url) {
	const values = Object.values(sizes);
	const maxSize = Math.ceil(Math.max(...values) / 100) * 100;
	const minSize = Math.ceil(Math.min(...values) / 100) * 100;
	let srcsetAttr = '';
	for (let size = minSize; size < maxSize * 2 + 1; size += 100) {
		srcsetAttr += `${url}?w=${size} ${size}w,`;
	}

	return srcsetAttr;
}

export function getResponseiveImage(sizes, url) {
	return [getSizesAttr(sizes), getSrcsetAttr(sizes, url)];
}
