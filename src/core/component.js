export default class Component {
	rootClassName;

	props;

	state;

	children;

	constructor(rootClassName) {
		this.rootClassName = rootClassName;
		this.children = [];
		this.initState();
		this.template = this.template();
	}

	initState() {
		this.state = {};
	}

	addChild(C, className) {
		const component = new C(className);
		this.children.push(component);
		return component;
	}

	template() {
		return (props) => {
			this.setProps(props);
			return `<div class="${this.rootClassName}" ></div>`;
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

		this.$root.addEventListener(eventType, (event) => {
			const target = getTarget(event.target);

			if (!target) return false;
			callback(event, target);
			return true;
		});
	}

	getRootNode() {
		return document.querySelector(`.${this.rootClassName}`);
	}

	setState() {}
}
