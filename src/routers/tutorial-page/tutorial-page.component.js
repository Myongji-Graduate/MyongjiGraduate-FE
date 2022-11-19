import Component from '../../core/component';

import Header from '../../components/header/header.component';
import GuideFuction from '../../components/guide-fuction/guide-fuction.component';

export default class TutorialPage extends Component {
	template() {
		const header = this.addChild(Header);
		const tutorialFunction = this.addChild(GuideFuction);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="tutorial-page">
					<div class="tutorial-page__header">
						${header.render()}	
						</div>	
					<div class="tutorial-page__body">
						<div class="tutorial-page__body__content">
						${tutorialFunction.render()}
						</div>
					</div>				
				</div>
			`;
		};
	}
}
