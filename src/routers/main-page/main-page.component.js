import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';

export default class MainPage extends Component {
	template() {

		const gnb = this.addChild(GNB);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="main-page">
					${gnb.render()}
				</div>
			`;
		};
	}
}
