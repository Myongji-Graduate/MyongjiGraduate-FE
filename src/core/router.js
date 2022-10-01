import Component from './component';
import * as dom from './dom';
import { store, createAction, actionType } from '../store/store';

let instance;

export default class Router extends Component {
	constructor(routerObjects) {
		if (instance) {
			return instance;
		}
		super();

		this.routerObjects = routerObjects;
		this.initGlobalStore();

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
		this.setEvent();
		return this.route(pathname);
	}

	serverRender(pathname) {
		const pageComponent = this.route(pathname);
		return new pageComponent().render();
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
		const pageComponent = this.route(pathname);
		return new pageComponent().render();
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
		window.addEventListener('popstate', () => {
			this.updatePage();
		});
	}

	updatePage() {
		dom.createDom('.app-container', this.render(window.location.pathname));
	}
}
