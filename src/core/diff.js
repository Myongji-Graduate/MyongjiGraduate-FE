export function updateAttributes(oldNode, newNode) {
	const oldProps = [...oldNode.attributes];
	const newProps = [...newNode.attributes];

	newProps.forEach(({ name, value }) => {
		if (value !== oldNode.getAttribute(name)) {
			oldNode.setAttribute(name, value);
		}
	});

	oldProps.forEach(({ name }) => {
		if (!newNode.getAttribute(name)) {
			oldNode.removeAttribute(name);
		}
	});
}

export function filterTextNode(childNodes) {
	return childNodes.filter((childNode) => {
		if (childNode.nodeType !== 3) return true;
		const text = childNode.data.replaceAll('\n', '').trim();

		return text.length !== 0;
	});
}

export function updateElement(parentNode, newNode, oldNode) {
	if (!newNode && oldNode) {
		oldNode.remove();
		return;
	}

	if (newNode && !oldNode) {
		parentNode.appendChild(newNode);
		return;
	}

	if (newNode.nodeType === 3 && oldNode.nodeType === 3) {
		if (oldNode.nodeValue === newNode.nodeValue) return;

		oldNode.nodeValue = newNode.nodeValue;
		return;
	}
	if (newNode.nodeName !== oldNode.nodeName) {
		parentNode.replaceChild(newNode, oldNode);
		return;
	}

	updateAttributes(oldNode, newNode);

	const newChildNodes = filterTextNode([...newNode.childNodes]);
	const oldChildNodes = filterTextNode([...oldNode.childNodes]);

	const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);

	for (let i = 0; i < maxLength; i += 1) {
		updateElement(oldNode, newChildNodes[i], oldChildNodes[i]);
	}
}
