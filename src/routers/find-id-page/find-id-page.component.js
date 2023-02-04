import Component from '../../core/component';

import FindIdForm from '../../components/find-id-form/find-id-form.component';
import Header from '../../components/header/header.component';

export default class findIdPage extends Component {
	template() {
		const header = this.addChild(Header);
		const findIdForm = this.addChild(FindIdForm);

		return (props) => {
			if (props) this.setProps(props);
			return `
        <div class="find-id-page">
          <div class="find-id-page__header">
            ${header.render()}
          </div>
          <div class="find-id-page__body">
              ${findIdForm.render()}
          </div>
        </div>
      `;
		};
	}
}
