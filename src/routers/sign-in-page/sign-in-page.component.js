import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import SigninForm from '../../components/sign-in-form/sign-in-form.component';

import signInBackgroundImage from '../../../public/images/sub-background.png';
import backgroundBottomImage from '../../../public/images/header-bottom.png';
import signImage from '../../../public/images/sign.png';

export default class SignInPage extends Component {
	template() {
		const gnb = this.addChild(GNB);
		const signinForm = this.addChild(SigninForm);

		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="sign-in-page">
          <div class="sign-in-page__header">
            ${gnb.render()}
            <img src=${signInBackgroundImage} class="sign-in-page__background-img" />
            <img src=${backgroundBottomImage} class="sign-in-page__bottom-img" />
          </div>
          <div class="sign-in-page__body">
            <div class="sign-in-page__content">
            <img src=${signImage} class="sign-in-page__body__img" />
            <div class="sign-in-page__body__content">           
              ${signinForm.render()}
            </div>
            </div>      
          </div>
        </div>
      `;
		};
	}
}
