import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';
import MyInfo from '../my-info/my-info.component';
import { signOut } from '../../helper/auth';
import Modal from '../modal/modal.component';
import ModalScession from '../modal-secession/modal-secession.component';

export default class InfoLogout extends Component {
	initState() {
		this.state = {
			isModalShow: false,
		};
	}

	toggleModal() {
		this.setState({
			isModalShow: !this.state.isModalShow,
		});
	}

	async logOut() {
		await signOut();
	}

	template() {
		const logoutButton = this.addChild(Button);
		const myInfo = this.addChild(MyInfo);
		const secessionModal = this.addChild(Modal);
		const secessionModalContent = this.addChild(ModalScession);
		return (props) => {
			if (props) this.setProps(props);

			const modalSecessionProps = {
				isModalShow: this.state.isModalShow,
				toggleModal: this.toggleModal.bind(this),
				contentComponent: secessionModalContent,
				width: 800,
				padding: 35,
				key: 'notice-modal',
			};

			return `
       <div class="info-logout">       
            <div class="info-logout__info"> 
            ${myInfo.render({
							key: 'profile',
						})}
            </div>                 
            <div class="info-logout__logout">
			${secessionModal.render(modalSecessionProps)}
            ${logoutButton.render({
							content: '로그아웃',
							type: buttonTypes.grey,
							size: 'sm',
							key: 'logout',
							onClick: this.logOut,
						})}
            </div>
			<div class="info-logout__secession">회원탈퇴하기</div>
       </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.info-logout__secession', () => {
			this.setState({
				isModalShow: !this.state.isModalShow,
			});
		});
	}
}
