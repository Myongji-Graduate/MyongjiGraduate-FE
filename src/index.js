import './root.scss';

import * as dom from './core/dom';

import { browserRouter } from './routers';

async function createApp() {
	dom.createDom('.app-container', await browserRouter.browserRender());
}

createApp();
