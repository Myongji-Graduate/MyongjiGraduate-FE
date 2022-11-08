import Component from '../../core/component';

import { store } from '../../store/store';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Modal from '../modal/modal.component';
import ModalLoading from '../modal-loading/modal-loading.component';
import Button from '../button/button.component';
import ModalAgreement from '../modal-agreement/modal-agreement.component';

import { buttonTypes, inputTypes } from '../../helper/types';
import { fetchSignIn } from '../../async/auth';
import { signIn } from '../../helper/auth';

export default class SigninForm extends Component {
	initState() {
		this.state = {
			id: '',
			password: '',
			isAgreementModal: false,
			isLoading: false,
		};
	}

	async submitData() {
		this.setState({
			isLoading: true,
		});
		const result = await fetchSignIn({
			id: 'testtest',
			password: '12345678!',
		});
		this.setState({
			isLoading: false,
		});

		if (result) {
			signIn();
			const { router } = store.getState();
			router.navigate('/mypage');
		}
	}

	agreementModal() {
		this.setState({
			isAgreementModal: !this.state.isAgreementModal,
		});
	}

	template() {
		const header = this.addChild(modalHeader);

		const idInputGroup = this.addChild(InputGroup);
		const passwordInputGroup = this.addChild(InputGroup);
		const signinButton = this.addChild(Button);

		const modalLoadingContainer = this.addChild(Modal);
		const modalLoading = this.addChild(ModalLoading);
		const modalAgreementContainer = this.addChild(Modal);
		const modalAgreement = this.addChild(ModalAgreement);

		return (props) => {
			if (props) this.setProps(props);

			const { isLoading } = this.state;

			const modalLoadingProps = {
				isModalShow: isLoading,
				contentComponent: modalLoading,
				width: 790,
				padding: 200,
				key: 'sign-in-loading',
			};

			const modalAggrementProps = {
				isModalShow: this.state.isAgreementModal,
				toggleModal: this.agreementModal.bind(this),
				contentComponent: modalAgreement,
				width: 1220,
				padding: 100,
				key: 'aggrement',
			};

			const idInputProps = {
				name: '아이디',
				placeholder: '아이디를 입력해주세요',
				value: this.state.id,
				onChange: (newValue) => {
					this.setState({ id: newValue });
				},
				key: 'sign-in-id',
			};

			const passwordInputProps = {
				name: '비밀번호',
				placeholder: '비밀번호를 입력해주세요',
				value: this.state.password,
				onChange: (newValue) => {
					this.setState({ password: newValue });
				},
				key: 'sign-in-password',
				type: inputTypes.password,
				buttonKey: 'sign-in',
			};

			const go = () => {
				const { router } = store.getState();
				router.navigate('/mypage');
			};

			return `
        <div class="sign-in-form">		
        ${modalLoadingContainer.render(modalLoadingProps)}
		${modalAgreementContainer.render(modalAggrementProps)}
        <div class="sign-in-form__header">${header.render({ title: '로그인' })}</div>
          <div class="sign-in-form__body">
            <div class="sign-in-form__id-input-group-container"> ${idInputGroup.render(
							idInputProps
						)}</div>                  
			<div class="sign-in-form__password-input-group-container"> ${passwordInputGroup.render(passwordInputProps)}  </div>   		
            <div class="sign-in-form__create-modal-button-container">
              ${signinButton.render({
								content: '로그인',
								type: buttonTypes.primary,
								size: 'md',
								key: 'sign-in',
								onClick: this.submitData.bind(this),
							})}
            </div>
			<div class="sign-in-form__footer">
			계정이 필요하신가요? 
			<div class="sign-in-form__footer-signup">가입하기</div>
			</div>
          </div>
        </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.sign-in-form__footer-signup', () => {
			this.agreementModal();
		});
	}
}
