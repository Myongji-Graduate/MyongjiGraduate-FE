import { updateDom } from './dom';

export default class Component {
	props;

	state;

	children;

	constructor() {
		this.children = [];
		this.initState();
		this.template = this.template();
	}

	initState() {
		this.state = {};
	}

	addChild(C) {
		const component = new C();
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
		return this.template(props).trim();
	}

	setEvent() {}

	setProps(newProps) {
		this.props = newProps;
	}

	addEvent(eventType, selector, callback) {
		const $root = this.getRootNode();
		const targetList = [...$root.querySelectorAll(selector)];

		const getTarget = (dom) => {
			if (targetList.includes(dom)) return dom;

			const target = dom.closest(selector);

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
		updateDom(this);
	}
}
