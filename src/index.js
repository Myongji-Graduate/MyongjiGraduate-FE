// import './nomalize.scss';
import * as dom from './core/dom';
import Component from './core/component';

import Header from './components/header/header.component';

export default class MainPage extends Component {
	template() {
		const header = this.addChild(Header, 'header');

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="${this.rootClassName}">
					${header.render('hi')}
				</div>
			`;
		};
	}
}

dom.createDom('.app-container', new MainPage('main-page'));
