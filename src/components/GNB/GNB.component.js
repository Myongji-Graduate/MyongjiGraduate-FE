import Component from '../../core/component';
import { store } from '../../store/store';

import mainLogo from '../../../public/icons/main-logo.svg';

export default class GNB extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="GNB">
          <img class="GNB__main-logo" src=${mainLogo} />
          <div class="GNB__tab-navigator">
            <div>튜토리얼</div>
          </div>
        </div>
        <div class="GNB__divider"></div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.GNB__tab-navigator', () => {
			const { router } = store.getState();
			router.navigate('/product');
		});
	}
}
