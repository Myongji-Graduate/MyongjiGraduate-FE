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

export function updateEvent(component) {
	component.setEvent();
	component.children.forEach((child) => {
		child.setEvent();
	});
}

export function createDom(parentNode, component) {
	console.log('asd');
	if (typeof parentNode === 'string') parentNode = document.querySelector(parentNode);

	const newNode = parentNode.cloneNode(true);
	newNode.innerHTML = component.render();

	// root가 없을 시에 어캐 할지 고려
	// 결국에 업데이트를 위해서 old와 new의 계층을 맞출 필요 있다.

	const newChildNodes = [...newNode.childNodes];
	const oldChildNodes = [...parentNode.childNodes];

	update(parentNode, newChildNodes, oldChildNodes);

	updateEvent(component);
}

export function updateDom(component) {
	const newNode = getNode(component);
	const parentNode = document.querySelector(`.${newNode.classList[0]}`);

	const newChildNodes = [...newNode.childNodes];
	const oldChildNodes = [...parentNode.childNodes];

	update(parentNode, newChildNodes, oldChildNodes);

	updateEvent(component);
}
