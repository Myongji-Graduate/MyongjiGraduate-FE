import './nomalize.scss';
import * as dom from './core/dom';

import App from './app';

dom.createDom('.app-container', new App('app'));
