import Component from '../../core/component';

import Header from '../../components/header/header.component';

import signImage from '../../../public/images/sign.png';
import SignupForm from '../../components/sign-up-form/sign-up-form.component';

export default class SignUpPage extends Component {
	template() {
		const header = this.addChild(Header);
		const signupForm = this.addChild(SignupForm);

		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="sign-up-page">
          <div class="sign-up-page__header">
            ${header.render()}
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
