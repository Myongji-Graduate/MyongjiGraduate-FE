import Component from './component';
import * as dom from './dom';
import { store, createAction, actionType } from '../store/store';

let instance;

export default class Router extends Component {
	lastPage;

	constructor(routerObjects, root) {
		if (instance) {
			return instance;
		}
		super();

		this.root = root;
		this.routerObjects = routerObjects;
		this.initGlobalStore();
		this.lastPage = undefined;
		this.isEnrolledEvent = false;

		instance = this;
	}

	initGlobalStore() {
		store.dispatch(
			createAction(actionType.enrollRouter, {
				router: this,
			})
		);
	}

	browserRender() {
		const { pathname } = window.location;
		const PageComponent = this.route(pathname);
		this.lastPage = new PageComponent();

		if (this.isEnrolledEvent === false) {
			this.setEvent();
			this.root.initChildComponent(this.lastPage);
		} else {
			this.root.setChildComponent(this.lastPage);
		}

		return this.root;
	}

	serverRender(pathname) {
		const PageComponent = this.route(pathname);
		this.root.setChildComponent(new PageComponent());

		return this.root.render();
	}

	route(pathname) {
		let path;
		if (pathname === '/') {
			path = ['/'];
		} else {
			path = pathname.split('/');
			path[0] = '/';
		}

		let RouterPage = this.findRouterPage(this.routerObjects, path);
		if (!RouterPage) {
			RouterPage = this.getDefaultPage();
		}
		return RouterPage;
	}

	getDefaultPage() {
		return this.routerObjects[0].element;
	}

	render(pathname) {
		const PageComponent = this.route(pathname);
		return new PageComponent().render();
	}

	findRouterPage(routerObjects, path) {
		const filteredRoutetObject = routerObjects.filter((routerObject) => {
			return routerObject.path === path[0];
		});
		if (filteredRoutetObject.length === 0) return false;

		if (!filteredRoutetObject[0].children || path.length === 1) return filteredRoutetObject[0].element;

		return this.findRouterPage(filteredRoutetObject[0].children, path.slice(1));
	}

	navigate(url) {
		window.history.pushState(null, null, url);
		this.updatePage();
	}

	setEvent() {
		window.addEventListener('popstate', this.updatePage.bind(this));
		this.isEnrolledEvent = true;
	}

	updatePage() {
		const lastComponent = this.lastPage;
		dom.createDom('.app-container', this.browserRender(), lastComponent);
	}
}
