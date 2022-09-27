import Component from './core/component';
import Header from './components/header/header.component';

export default class App extends Component {
	template() {
		const header = this.addChild(Header);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="app">
					${header.render('hi')}
				</div>
			`;
		};
	}
}
