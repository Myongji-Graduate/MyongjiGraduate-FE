import { subscribe, unlockSubscribe } from './observer';
import * as dom from './dom';

export default class Component {
	props;

	state;

	children;

	eventListeners;

	constructor() {
		this.children = [];
		this.eventListeners = [];
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

		const eventListener = (event) => {
			const target = getTarget(event.target);

			if (!target) return false;
			callback(event, target);
			return true;
		}

		this.eventListeners.push({
			eventListener,
			eventType
		});

		$root.addEventListener(eventType, eventListener);
	}

	getRootNode() {
		const el = document.createElement('div');
		el.innerHTML = this.render(this.props);
		const className = el.firstChild.classList[0];
		return document.querySelector(`.${className}`);
	}

	clearEvent() {
		const $root = this.getRootNode();
		this.eventListeners.forEach(({eventType, eventListener}) => {
			$root.removeEventListener(eventType, eventListener);
		});
	}

	setState(newState) {
		this.state = {
			...this.state,
			...newState,
		};
		dom.updateDom(this);
	}
}
