import './root.scss';

import * as dom from './core/dom';

import { router } from './routers';

dom.createDom('.app-container', router.browserRender());
