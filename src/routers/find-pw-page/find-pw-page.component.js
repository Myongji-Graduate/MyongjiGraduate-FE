import Component from '../../core/component';

import FindPwForm from '../../components/find-pw-form/find-pw-form.component';
import Header from '../../components/header/header.component';

export default class findPwPage extends Component {
	template() {
		const header = this.addChild(Header);
		const findPwForm = this.addChild(FindPwForm);

		return (props) => {
			if (props) this.setProps(props);
			return `
        <div class="find-pw-page">
          <div class="find-pw-page__header">
            ${header.render()}
          </div>
          <div class="find-pw-page__body">
              ${findPwForm.render()}
          </div>
        </div>
      `;
		};
	}
}
