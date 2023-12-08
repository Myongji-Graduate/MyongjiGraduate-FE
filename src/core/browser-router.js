import Router from './router';
import { store, createAction, actionType } from '../store/store';
import * as dom from './dom';

import { userRule } from '../helper/types';
import { fetchValidateUser } from '../async/auth';

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

	async browserRender() {
		const { pathname } = window.location;
		let routerObject = this.route(pathname);
		routerObject = await this.authentication(routerObject);

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

	async authentication(routerObject) {
		if (routerObject.authentication === userRule.guest) return routerObject;

		const auth = await fetchValidateUser();

		if (auth.validToken === false) return this.redirectAuthPage();

		if (routerObject.authentication === userRule.init) return routerObject;

		if (auth.init === true) return this.redirectInitPage(); //

		return routerObject;
	}

	redirectAuthPage() {
		window.history.pushState(null, null, '/sign-in');
		return this.route('/sign-in');
	}

	redirectInitPage() {
		window.history.pushState(null, null, '/file-upload');
		return this.route('/file-upload');
	}

	navigate(url) {
		window.history.pushState(null, null, url);
		this.updatePage();
	}

	setEvent() {
		window.addEventListener('popstate', this.updatePage.bind(this));
		this.isEnrolledEvent = true;
	}

	async updatePage() {
		const lastComponent = this.lastPage;
		dom.createDom('.app-container', await this.browserRender(), lastComponent);
	}
}
