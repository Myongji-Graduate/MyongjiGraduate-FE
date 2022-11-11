import Component from '../../core/component';
import MobileCategory from '../mobile-category/mobile-category.component';
import { store } from '../../store/store';
import { checkIsSignIn, signOut } from '../../helper/auth';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 110,
	tablet: 140,
	sm: 140,
	md: 180,
	lg: 240,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage( sizes, `${IMAGE_URL}/images/main-logo.svg`);

export default class GNB extends Component {
	initState() {
		this.state = {
			ismobileCategoryShow: false,
			isLogin: checkIsSignIn(),
		};
	}

	togglemobileCategory() {
		this.setState({
			ismobileCategoryShow: !this.state.ismobileCategoryShow,
		});
	}

	async logOut() {
		await signOut();
		this.setState({
			isLogin: checkIsSignIn(),
		});
	}

	template() {
		const mobileCategoryContainer = this.addChild(MobileCategory);

		return (props) => {
			if (props) this.setProps(props);

			const mobileCategoryProps = {
				ismobileCategoryShow: this.state.ismobileCategoryShow,
				togglemobileCategory: this.togglemobileCategory.bind(this),
				isLogin: this.state.isLogin,
				logOut: this.logOut.bind(this),
			};
			return `
        <div class="GNB">
		${mobileCategoryContainer.render(mobileCategoryProps)}
          <div class="GNB__content">
            <img class="GNB__main-logo"  sizes="${sizesAttr}" srcset="${srcsetAttr}" alt="GNB__main-logo"/>
            <div class="GNB__tab-navigator">
              <div class="GNB__tab-navigator__general">
			  ${
					this.state.isLogin
						? `<div class="GNB__tab-navigator__general-item gnb-mypage">마이페이지</div> 
				  <div class="GNB__tab-navigator__general-item gnb-result">결과페이지</div>`
						: `<div class="GNB__tab-navigator__general-item gnb-signin">로그인</div>`
				}
				 <div class="GNB__tab-navigator__general-item gnb-tutorial">튜토리얼</div>
			  </div>
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
		const { router } = store.getState();
		this.addEvent('click', '.GNB__main-logo', () => {
			router.navigate('/');
		});
		this.addEvent('click', '.gnb-mypage', () => {
			router.navigate('/mypage');
		});
		this.addEvent('click', '.gnb-result', () => {
			router.navigate('/result');
		});
		this.addEvent('click', '.gnb-signin', () => {
			router.navigate('/sign-in');
		});
		this.addEvent('click', '.gnb-tutorial', () => {
			router.navigate('/tutorial');
		});
		this.addEvent('click', '.GNB__tab-navigator__mobile', () => {
			this.togglemobileCategory();
		});
	}
}
