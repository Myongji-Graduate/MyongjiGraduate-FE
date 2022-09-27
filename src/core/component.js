import { subscribe, unlockSubscribe } from './observer';
import * as dom from './dom';

export default class Component {
	props;

	state;

	children;

	constructor() {
		this.children = [];
		this.initState();
		this.setProps({});
		this.template = this.template();
	}

	initState() {
		this.state = {};
	}

	addChild(C, ...args) {
		const component = new C(...args);
		this.children.push(component);
		return component;
	}

	template() {
		return (props) => {
			this.setProps(props);
			return `<div></div>`;
		};
	}

	render(props) {
		subscribe(this);
		const html = this.template(props).trim();
		unlockSubscribe();
		return html;
	}

	setEvent() {}

	setProps(newProps) {
		this.props = newProps;
	}

	addEvent(eventType, selector, callback) {
		const $root = this.getRootNode();
		const targetList = [...$root.querySelectorAll(selector)];

		const getTarget = (eventDom) => {
			if (targetList.includes(eventDom)) return eventDom;

			const target = eventDom.closest(selector);

			if (target) return target;
			return false;
		};

		$root.addEventListener(eventType, (event) => {
			const target = getTarget(event.target);

			if (!target) return false;
			callback(event, target);
			return true;
		});
	}

	getRootNode() {
		const el = document.createElement('div');
		el.innerHTML = this.render(this.props);
		const className = el.firstChild.classList[0];
		return document.querySelector(`.${className}`);
	}

	setState(newState) {
		this.state = {
			...this.state,
			...newState,
		};
		dom.updateDom(this);
	}
}
