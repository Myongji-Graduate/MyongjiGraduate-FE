import Component from '../../core/component';
import * as utils from '../../helper/utils';
import MyInfo from '../../components/my-info/my-info.component';
import MobileNavigate from '../../components/mobile-navigate/mobile-navigate.component';

export default class MobileCategory extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);
			const myInfo = this.addChild(MyInfo);
			const mobileNavigate=this.addChild(MobileNavigate);
			const { ismobileCategoryShow } = this.props;

			const modalStyle = {
				display: ismobileCategoryShow ? 'block' : 'none',
			};

			return `
        <div class="mobile-category" style=${utils.getInlineStyle(modalStyle)}>
           <div class="mobile-category__content">
                <div class="mobile-category__content-info">${myInfo.render()}</div>
				<div class="mobile-category__content-divider"></div>
                <div class="mobile-category__content-menu">${mobileNavigate.render({ title:'튜토리얼', navigate:'tutorial' })}</div>
                <div class="mobile-category__content-sign">로그아웃</div>
           </div>
        </div>
        `;
		};
	}

	setEvent() {
		const { togglemobileCategory, ismobileCategoryShow } = this.props;

		this.addEvent(
			'click',
			'.mobile-category',
			() => {
				if (ismobileCategoryShow) togglemobileCategory();
			},
			true
		);
	}
}
