export default class Component {
	parentSelector;

	props;

	state;

	children;

	constructor(selector) {
		this.parentSelector = selector;
		this.children = [];
		this.initState();
		this.render = this.render();
	}

	initState() {
		this.state = {};
	}

	addChild(C) {
		const component = new C();
		this.children.push(component);
		return component;
	}

	render() {
		return (props) => {
			this.setProps(props);
			return `<div></div>`;
		};
	}

	setEvent() {}

	setProps(newProps) {
		this.props = newProps;
	}

	addEvent(eventType, selector, callback) {
		const $parent = document.querySelector(this.parentSelector);
		const targetList = [...$parent.querySelectorAll(selector)];

		const getTarget = (dom) => {
			if (targetList.includes(dom)) return dom;

			const target = dom.closest(selector);

			if (target) return target;
			return false;
		};

		this.$parent.addEventListener(eventType, (event) => {
			const target = getTarget(event.target);

			if (!target) return false;
			callback(event, target);
			return true;
		});
	}

	setState() {}
}
