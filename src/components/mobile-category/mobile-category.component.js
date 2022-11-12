import Component from '../../core/component';
import * as utils from '../../helper/utils';
import MyInfo from '../my-info/my-info.component';
import MobileNavigate from '../mobile-navigate/mobile-navigate.component';
import { store } from '../../store/store';

export default class MobileCategory extends Component {
	setDefaultProps() {
		this.props = {
			ismobileCategoryShow: false,
			isLogin: false,
			togglemobileCategory: () => {},
			logOut: () => {},
		};
	}

	template() {
		const myInfo = this.addChild(MyInfo);
		const tutorialNavigate = this.addChild(MobileNavigate);
		const mypageNavigate = this.addChild(MobileNavigate);
		const resultNavigate = this.addChild(MobileNavigate);
		return (props) => {
			if (props) this.setProps(props);
			const { ismobileCategoryShow, isLogin } = this.props;

			const modalStyle = {
				display: ismobileCategoryShow ? 'block' : 'none',
			};

			return `
			<div class="mobile-category" style=${utils.getInlineStyle(modalStyle)}>
			<div class="mobile-category__content">
			${
				isLogin
					? `
					 <div class="mobile-category__content-info">${myInfo.render()}</div>
					 <div class="mobile-category__content-divider"></div>
					 
					 <div class="mobile-category__content-menu">${resultNavigate.render({ title: '결과페이지', navigate: 'result' })}</div>
					 <div class="mobile-category__content-menu">${mypageNavigate.render({ title: '마이페이지', navigate: 'mypage' })}</div>			
					 <div class="mobile-category__content-menu">${tutorialNavigate.render({ title: '튜토리얼', navigate: 'tutorial' })}</div>
					 				
					 <div class="mobile-category__content-signout">로그아웃</div>			
				`
					: `
					 <div class="mobile-category__content-info">${myInfo.render()}</div>
					 <div class="mobile-category__content-divider"></div>
					 
					 <div class="mobile-category__content-menu">${tutorialNavigate.render({ title: '튜토리얼', navigate: 'tutorial' })}</div>
					 
					 <div class="mobile-category__content-signin">로그인</div>
				`
			}
			</div>
			</div>
        `;
		};
	}

	setEvent() {
		const { togglemobileCategory, ismobileCategoryShow, logOut } = this.props;

		this.addEvent(
			'click',
			'.mobile-category',
			() => {
				if (ismobileCategoryShow) togglemobileCategory();
			},
			true
		);

		this.addEvent('click', '.mobile-category__content-signin', () => {
			const { router } = store.getState();
			router.navigate('./sign-in');
		});

		this.addEvent('click', '.mobile-category__content-signout', () => {
			logOut();
		});
	}
}
