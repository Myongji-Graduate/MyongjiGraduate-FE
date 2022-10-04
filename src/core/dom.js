import * as diff from './diff';

export function update(parentNode, newChildNodes, oldChildNodes) {
	const maxLength = Math.max(newChildNodes.length, oldChildNodes.length);
	for (let i = 0; i < maxLength; i += 1) {
		diff.updateElement(parentNode, newChildNodes[i], oldChildNodes[i]);
	}
}

export function getNode(component) {
	const el = document.createElement('div');
	el.innerHTML = component.render();
	return el.firstChild;
}

export function enrollEvent(component) {
	component.setEvent();
	component.children.forEach((child) => {
		enrollEvent(child);
	});
}

export function clearEvent(component) {
	component.clearEvent();
	component.children.forEach((child) => {
		clearEvent(child);
	});
}

export function createDom(parentNode, component, lastComponent) {
	if (typeof parentNode === 'string') parentNode = document.querySelector(parentNode);

	const newNode = parentNode.cloneNode(true);
	newNode.innerHTML = component.render();

	if (lastComponent) clearEvent(lastComponent);
	diff.updateElement(parentNode.parentNode, newNode, parentNode);
	enrollEvent(component);
}

export function updateDom(component) {
	const newNode = getNode(component);
	const parentNode = document.querySelector(`.${newNode.classList[0]}`);

	clearEvent(component);
	console.dir(component);
	console.dir(newNode);
	console.dir(parentNode);

	diff.updateElement(parentNode.parentNode, newNode, parentNode);

	enrollEvent(component);
}
