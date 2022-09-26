// import './nomalize.scss';
import Component from './core/component';

import Header from './components/header/header.component';

export default class MainPage extends Component {
	render() {
		const header = this.addChild(Header);

		return (props) => {
			this.setProps(props);

			return `
				<div class="main-page">
					${header.render('hi')}
				</div>
			`;
		};
	}
}
