import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';

export default class TutorialPage extends Component {
	template() {
		const gnb = this.addChild(GNB);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="tutorial-page">
					${gnb.render()}
					튜토리얼 페이지
				</div>
			`;
		};
	}
}
