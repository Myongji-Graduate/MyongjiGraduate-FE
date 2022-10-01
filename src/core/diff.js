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
		const index = [...parentNode.childNodes].indexOf(oldNode);
		oldNode.remove();
		parentNode.appendChild(newNode, index);
		return;
	}

	updateAttributes(oldNode, newNode);

	const newChildNodes = [...newNode.childNodes];
	const oldChildNodes = [...oldNode.childNodes];

	const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);

	for (let i = 0; i < maxLength; i += 1) {
		updateElement(oldNode, newChildNodes[i], oldChildNodes[i]);
	}
}
