import Component from '../../core/component';

import SigninForm from '../../components/sign-in-form/sign-in-form.component';
import Header from '../../components/header/header.component';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 315,
	tablet: 315,
	sm: 315,
	md: 405,
	lg: 540,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes,`${IMAGE_URL}/images/mju-maru.jpg`);

export default class SignInPage extends Component {
	template() {
		const header = this.addChild(Header);

		const signinForm = this.addChild(SigninForm);

		return (props) => {
			if (props) this.setProps(props);
			return `
        <div class="sign-in-page">
          <div class="sign-in-page__header">
            ${header.render()}
          </div>
          <div class="sign-in-page__body">
            <div class="sign-in-page__content">
            <div class="sign-in-page__body__img-container">
              <img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="sign-in-page__body__img" alt="sign-in-page__body__img" />
            </div>
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
