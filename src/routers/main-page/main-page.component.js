import Component from '../../core/component';

import Maintitle from '../../components/main-title/main-title.component';
import MainBtn from '../../components/button/mainpageBtn.component';
import Modal from '../../components/modal/modal.component';
import ModalLoading from '../../components/modal-loading/modal-loading.component';

import MainBackgroundImg from '../../../public/images/main-background.png'
import roundLogo from '../../../public/icons/round-logo.svg';

export default class MainPage extends Component {

	initState() {
		this.state = {
			isModalShow: true
		}
	}

	toggleModal() {
		this.setState({
			isModalShow: !this.state.isModalShow
		});
	}

	template() {
		const maintitle = this.addChild(Maintitle);
		const startBtn = this.addChild(MainBtn);
		const modal = this.addChild(Modal);
		const modalLoading = this.addChild(ModalLoading);

		return (props) => {
			if (props) this.setProps(props);

			return `
			<div class="main-page">
			${modal.render({
				isModalShow: this.state.isModalShow,
				toggleModal: this.toggleModal.bind(this),
				contentComponent: modalLoading,
				width: 790,
			})}
				<div class="main-page__body" >
					<img class="main-page__background-img" src=${MainBackgroundImg} />				
					<img class="main-page__round-logo" src=${roundLogo} />
					<div class="main-page__content">
						${maintitle.render()}
						${startBtn.render()}					
					</div>
				</div>
			</div>
			`;
		};
	}

	setEvent() {
		this.addEvent('click', '.main-page__round-logo', () => {
			this.toggleModal()
		})
	}
}
