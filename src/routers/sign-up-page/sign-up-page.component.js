import Component from '../../core/component';

import Header from '../../components/header/header.component';

import SignupForm from '../../components/sign-up-form/sign-up-form.component';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 315,
	tablet: 315,
	sm: 315,
	md: 405,
	lg: 540,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/mju-maru.jpg`);

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
            <div class="sign-up-page__body__img-container">
              <img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="sign-up-page__body__img" alt="sign-up-page__body__img" />
            </div>
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
