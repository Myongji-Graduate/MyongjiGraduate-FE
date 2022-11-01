import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
// import sign-inForm from '../../components/information-form/information-form.component';

import signUpBackgroundImage from '../../../public/images/sub-background.png';
import backgroundBottomImage from '../../../public/images/header-bottom.png';
import signImage from '../../../public/images/sign.png';
import SignupForm from '../../components/sign-up-form/sign-up-form.component';

export default class SignUpPage extends Component {
	template() {
		const gnb = this.addChild(GNB);
		const signupForm = this.addChild(SignupForm);

		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="sign-up-page">
          <div class="sign-up-page__header">
            ${gnb.render()}
            <img src=${signUpBackgroundImage} class="sign-up-page__background-img" />
            <img src=${backgroundBottomImage} class="sign-up-page__bottom-img" />
          </div>
          <div class="sign-up-page__body">
            <div class="sign-up-page__content">
            <img src=${signImage} class="sign-up-page__body__img" />
            <div class="sign-up-page__body__content">           
              ${signupForm.render()}
            </div>
            </div>      
          </div>
        </div>
      `;
		};
	}
}
