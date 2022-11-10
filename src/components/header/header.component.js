import Component from '../../core/component';
import GNB from '../GNB/GNB.component';

import backgroundImage from '../../../public/images/sub-background.png';
import backgroundBottomImage from '../../../public/images/header-bottom.png';

export default class Header extends Component {
	template() {
		const gnb = this.addChild(GNB);
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="header">
					<div class="header__gnb-container">
						${gnb.render()}
					</div>
					<img src=${backgroundImage} class="header__background-img" alt="header__background-img" />
					<img src=${backgroundBottomImage} class="header__bottom-img" alt="header__bottom-img" />
        </div>
      `;
		};
	}
}
