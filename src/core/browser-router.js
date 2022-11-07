import Router from './router';
import { store, createAction, actionType } from '../store/store';
import * as dom from './dom';
import { checkIsSignIn } from '../helper/auth';

export default class BrowserRouter extends Router {
	lastPage;

	constructor(routerObjects, root, authCallback) {
		super(routerObjects, root, authCallback);
		this.initGlobalStore();
		this.lastPage = undefined;
		this.isEnrolledEvent = false;
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
		let routerObject = this.route(pathname);

		if (routerObject.authentication) {
			routerObject = this.authentication(routerObject);
		}

		const PageComponent = routerObject.element;

		this.lastPage = new PageComponent();

		if (this.isEnrolledEvent === false) {
			this.setEvent();
			this.root.initChildComponent(this.lastPage);
		} else {
			this.root.setChildComponent(this.lastPage);
		}

		return this.root;
	}

	authentication(routerObject) {
		if (checkIsSignIn()) {
			return routerObject;
		}
		return this.redirectAuthPage();
	}

	redirectAuthPage() {
		window.history.pushState(null, null, '/sign-in');
		return this.route('/sign-in');
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
