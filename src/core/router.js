import Component from './component';

export default class Router extends Component {
	constructor(routerObjects, root) {
		super();

		this.root = root;
		this.routerObjects = routerObjects;
	}

	route(pathname) {
		let path;
		if (pathname === '/') {
			path = ['/'];
		} else {
			path = pathname.split('/');
			path[0] = '/';
		}

		let routerObject = this.findRouterObject(this.routerObjects, path);
		if (!routerObject) {
			routerObject = this.getDefaultPage();
		}

		return routerObject;
	}

	getDefaultPage() {
		return this.routerObjects[0];
	}

	findRouterObject(routerObjects, path) {
		const filteredRoutetObject = routerObjects.filter((routerObject) => {
			return routerObject.path === path[0];
		});
		if (filteredRoutetObject.length === 0) return false;

		if (!filteredRoutetObject[0].children || path.length === 1) return filteredRoutetObject[0];

		return this.findRouterObject(filteredRoutetObject[0].children, path.slice(1));
	}
}
