import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import InformationForm from '../../components/information-form/information-form.component';

import informationBackgroundImage from '../../../public/images/sub-background.png';
import backgroundBottomImage from '../../../public/images/header-bottom.png';

export default class InformationPage extends Component {
	template() {
		const gnb = this.addChild(GNB);
		const informationForm = this.addChild(InformationForm);

		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="information-page">
          <div class="information-page__header">
            ${gnb.render()}
            <img src=${informationBackgroundImage} class="information-page__background-img" />
            <img src=${backgroundBottomImage} class="information-page__bottom-img" />
          </div>
          <div class="information-page__body">
            <div class="information-page__content">
              ${informationForm.render()}
            </div>
          </div>
        </div>
      `;
		};
	}
}
