import Component from '../../core/component';
import Modal from '../../components/modal/modal.component';
import Maintitle from '../../components/main-title/main-title.component';
import MainBtn from '../../components/button/button.component';
import GNB from '../../components/GNB/GNB.component';
import { store } from '../../store/store';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 400,
	tablet: 600,
	sm: 900,
	md: 1151,
	lg: 1200,
};

const roundSizes = {
	mobile: 112,
	tablet: 112,
	sm: 112,
	md: 145,
	lg: 192,
};

const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/main-background.png`);
const [roundSizeAttr, roundSrcsetAttr] = getResponseiveImage(roundSizes, `${IMAGE_URL}/images/round-logo.svg`);

export default class MainPage extends Component {
	template() {
		const gnb = this.addChild(GNB);
		const maintitle = this.addChild(Maintitle);
		const startBtn = this.addChild(MainBtn);

		return (props) => {
			if (props) this.setProps(props);

			return `
			<div class="main-page">
			<div class="main-page__gnb-container">
			${gnb.render()}
			</div>
				<div class="main-page__body" >
					<img class="main-page__background-img" sizes="${sizeAttr}" srcset="${srcsetAttr}" alt="main-page__background-img"/>				
					<img class="main-page__round-logo" sizes="${roundSizeAttr}" srcset="${roundSrcsetAttr}" alt="main-page__round-logo" />
					<div class="main-page__content">
						${maintitle.render()}
						<div class="main-page__start-button">
						${startBtn.render({
							content: '검사시작',
							onClick: () => {
								const { router } = store.getState();
								router.navigate('/mypage');
							},
						})}					
						</div>
					</div>
				</div>
			</div>
			`;
		};
	}
}
