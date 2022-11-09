import Component from '../../core/component';

import Maintitle from '../../components/main-title/main-title.component';
import MainBtn from '../../components/button/button.component';
import GNB from '../../components/GNB/GNB.component';

import { store } from '../../store/store';

import MainBackgroundImg from '../../../public/images/main-background.png';
import roundLogo from '../../../public/icons/round-logo.svg';

export default class MainPage extends Component {
	initState() {
		this.state = {
			isModalShow: true,
		};
	}

	toggleModal() {
		this.setState({
			isModalShow: !this.state.isModalShow,
		});
	}

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
					<img class="main-page__background-img" src=${MainBackgroundImg} alt="main-page__background-img"/>				
					<img class="main-page__round-logo" src=${roundLogo} alt="main-page__round-logo" />
					<div class="main-page__content">
						${maintitle.render()}
						<div class="main-page__start-button">
						${startBtn.render({
							content: '검사시작',
							onClick: () => {
								const { router } = store.getState();
								router.navigate('/sign-in');
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
