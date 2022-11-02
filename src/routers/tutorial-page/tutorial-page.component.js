import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import GuideFuction from '../../components/guide-fuction/guide-fuction.component';

import signInBackgroundImage from '../../../public/images/sub-background.png';
import backgroundBottomImage from '../../../public/images/header-bottom.png';

export default class TutorialPage extends Component {
	template() {
		const gnb = this.addChild(GNB);
		const tutorialFunction = this.addChild(GuideFuction);

		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="tutorial-page">
					<div class="tutorial-page__header">
						${gnb.render()}	
						<img src=${signInBackgroundImage} class="tutorial-page__background-img" />
						<img src=${backgroundBottomImage} class="tutorial-page__bottom-img" />
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
