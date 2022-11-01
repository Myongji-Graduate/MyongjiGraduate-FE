import Component from '../../core/component';

import { store } from '../../store/store';
import { fetchResult } from '../../store/async-action';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Modal from '../modal/modal.component';
import ModalLoading from '../modal-loading/modal-loading.component';
import Button from '../button/button.component';

import { buttonTypes } from '../../helper/types';
import { validateshortlength, validatelonglength, validatespecialSymbol } from '../../helper/validation';
import { router } from '../../routers';

export default class SigninForm extends Component {
	initState() {
		this.state = {
			id: '',
			password: '',
			isValidationOfId: false,
			isValidationOfPassword: false,
		};
	}

	validationCallbackOfId(id) {
		let resultId = true;
		if (validateshortlength(id, 6) || validatelonglength(id, 20)) resultId = false;
		this.setState({
			isValidationOfId: resultId,
		});
	}

	validationCallbackOfPassword(password) {
		let resultPassword = true;
		if (validateshortlength(password, 8) || (validatelonglength(password, 20) && validatespecialSymbol(password)))
			resultPassword = false;
		this.setState({
			isValidationOfPassword: resultPassword,
		});
	}

	submitData() {
		const formData = new FormData();

		formData.append('id', this.state.id);
		formData.append('password', this.state.password);
		store.dispatch(fetchResult(formData));
	}

	template() {
		const header = this.addChild(modalHeader);

		const idInputGroup = this.addChild(InputGroup);
		const passwordInputGroup = this.addChild(InputGroup);
		const signinButton = this.addChild(Button);

		const modalLoadingContainer = this.addChild(Modal);
		const modalLoading = this.addChild(ModalLoading);

		return (props) => {
			if (props) this.setProps(props);

			const { isLoadingModalShow } = store.getState();

			const modalLoadingProps = {
				isModalShow: isLoadingModalShow,
				contentComponent: modalLoading,
				width: 790,
				padding: 200,
				key: 'loading',
			};

			const idInputProps = {
				name: '아이디',
				placeholder: '아이디를 입력해주세요',
				value: this.state.id,
				onChange: (newValue) => {
					this.setState({ id: newValue });
				},
				isValidation: this.state.isValidationOfId,
				validationCallback: this.validationCallbackOfId.bind(this),
				errorMessage: '8자 이상 20자 이하이어야 합니다',
				key: 'id',
			};

			const passwordInputProps = {
				name: '비밀번호',
				placeholder: '비밀번호를 입력해주세요',
				value: this.state.password,
				onChange: (newValue) => {
					this.setState({ password: newValue });
				},
				isValidation: this.state.isValidationOfPassword,
				validationCallback: this.validationCallbackOfPassword.bind(this),
				errorMessage: '',
				key: 'password',
			};

			return `
        <div class="sign-in-form">		
        ${modalLoadingContainer.render(modalLoadingProps)}
        <div class="sign-in-form__header">${header.render({ title: '로그인' })}</div>
          <div class="sign-in-form__body">
            <div class="sign-in-form__id-input-group-container"> ${idInputGroup.render(idInputProps)}</div>                  
			<div class="sign-in-form__password-input-group-container"> ${passwordInputGroup.render(passwordInputProps)}  </div>   		
            <div class="sign-in-form__create-modal-button-container">
              ${signinButton.render({
								content: '로그인',
								type: buttonTypes.primary,
								size: 'md',
								key: 'modal-display',
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
	setEvent(){
		this.addEvent('click','.sign-in-form__footer-signup', () => {
			const { router } = store.getState();
			router.navigate('./sign-up');
		})
	  }
}
