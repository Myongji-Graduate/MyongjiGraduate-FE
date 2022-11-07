import Router from './router';
import ssrTemplate from './ssr-template';

export default class ServerRouter extends Router {
	serverRender(pathname, isAuth) {
		const routerObject = this.route(pathname);

		const PageComponent = routerObject.element;
		this.root.setChildComponent(new PageComponent());

		return ssrTemplate(this.root.render(), isAuth);
	}

	checkAuthentication(pathname) {
		const routerObject = this.route(pathname);
		return routerObject.authentication;
	}
}
