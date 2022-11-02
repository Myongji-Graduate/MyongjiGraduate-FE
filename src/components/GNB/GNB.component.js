import Component from '../../core/component';
import MobileCategory from '../mobile-category/mobile-category.component';
import { store } from '../../store/store';

import mainLogo from '../../../public/icons/main-logo.svg';

export default class GNB extends Component {
	initState() {
		this.state = {
			ismobileCategoryShow: false,
		};
	}

	togglemobileCategory() {
		this.setState({
			ismobileCategoryShow: !this.state.ismobileCategoryShow,
		});
	}

	template() {
		const mobileCategoryContainer = this.addChild(MobileCategory);

		
		return (props) => {
			if (props) this.setProps(props);

			const mobileCategoryProps = {
				ismobileCategoryShow: this.state.ismobileCategoryShow,
				togglemobileCategory: this.togglemobileCategory.bind(this),
			};
			return `
        <div class="GNB">
		${mobileCategoryContainer.render(mobileCategoryProps)}
          <div class="GNB__content">
            <img class="GNB__main-logo" src=${mainLogo} />
            <div class="GNB__tab-navigator">
              <div class="GNB__tab-navigator__general">튜토리얼</div>
			  <div class="GNB__tab-navigator__mobile">
				<div class="GNB__tab-navigator__mobile-line"></div>
				<div class="GNB__tab-navigator__mobile-line"></div>
				<div class="GNB__tab-navigator__mobile-line"></div>
			  </div>
            </div>
          </div>
          <div class="GNB__divider"></div>
        </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.GNB__main-logo', () => {
			const { router } = store.getState();
			router.navigate('/');
		});
		this.addEvent('click', '.GNB__tab-navigator__general', () => {
			const { router } = store.getState();
			router.navigate('/tutorial');
		});
		this.addEvent('click', '.GNB__tab-navigator__mobile', () => {
			this.togglemobileCategory();
		});
	}
}
