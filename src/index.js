import './root.scss';

import * as dom from './core/dom';

import { browserRouter } from './routers';

dom.createDom('.app-container', browserRouter.browserRender());
