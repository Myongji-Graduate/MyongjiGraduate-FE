import Component from '../../core/component';

import GNB from '../../components/GNB/GNB.component';
import Maintitle from '../../components/main-title/main-title.component';
import MainBtn from '../../components/button/mainpageBtn.component';
// import Modal from '../../components/modal/modal.component';

import MainBackgroundImg from '../../../public/images/main-background.png'
import roundLogo from '../../../public/icons/round-logo.svg';

export default class MainPage extends Component {
	template() {
		const gnb = this.addChild(GNB);
		const maintitle = this.addChild(Maintitle);
		const startBtn = this.addChild(MainBtn);
		// const modal = this.addChild(Modal);

		return (props) => {
			if (props) this.setProps(props);

			// ${modal.render()}
			return `
			<div class="main-page__GNB">${gnb.render()}</div>				
				<div class="main-page" >
					<img class="main-page__background-img" src=${MainBackgroundImg} />				
				<img class="main-page__round-logo" src=${roundLogo} />
				<div class= "main-page__content">
				${maintitle.render()}
				${startBtn.render()}					
				</div>
				</div>
			`;
		};
	}
}
