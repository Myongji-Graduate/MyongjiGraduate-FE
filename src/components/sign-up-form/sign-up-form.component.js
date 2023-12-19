import Component from '../../core/component';

import { store } from '../../store/store';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Modal from '../modal/modal.component';
import ModalLoading from '../modal-loading/modal-loading.component';
import { fetchSignUp } from '../../async/auth';
import Button from '../button/button.component';

import { buttonTypes, inputTypes } from '../../helper/types';
import {
	validateshortlength,
	validatelonglength,
	validatespecialSymbol,
	validateReconfirm,
	validateLength,
	validateOnlyNumber,
} from '../../helper/validation';

export default class SignupForm extends Component {
	initState() {
		this.state = {
			id: '',
			password: '',
			reconfirm: '',
			studentId: '',
			englishLevel: '',
			isValidationOfId: false,
			isValidationOfPassword: false,
			isValidationOfReconfirm: false,
			isValidationOfStudentId: false,
			totalValidation: false,
		};
	}

	validationTotal() {
		const { isValidationOfId, isValidationOfPassword, isValidationOfReconfirm, isValidationOfStudentId } = this.state;
		if (
			isValidationOfId &&
			isValidationOfPassword &&
			isValidationOfReconfirm &&
			isValidationOfStudentId &&
			this.validationEnglishLevel(this.state.englishLevel)
		) {
			return true;
		}
		return false;
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
		if (validateshortlength(password, 8) || validatelonglength(password, 20) || validatespecialSymbol(password))
			resultPassword = false;
		this.setState({
			isValidationOfPassword: resultPassword,
		});
	}

	validationCallbackOfReconfirm(reconfirm) {
		let resultReconfirm = true;
		if (validateReconfirm(reconfirm, this.state.password)) resultReconfirm = false;
		this.setState({
			isValidationOfReconfirm: resultReconfirm,
		});
	}

	validationCallbackOfStudentId(studentId) {
		let resultStudentId = true;
		if (validateLength(studentId, 8) || validateOnlyNumber(studentId)) resultStudentId = false;
		this.setState({
			isValidationOfStudentId: resultStudentId,
		});
	}

	validationEnglishLevel(englishLevel) {
		return englishLevel !== '';
	}

	async submitData() {
		const result = await fetchSignUp({
			id: this.state.id,
			password: this.state.password,
			studentId: this.state.studentId,
			englishLevel: this.state.englishLevel,
		});

		if (result) {
			const { router } = store.getState();
			router.navigate('/sign-in');
		}
	}

	template() {
		const header = this.addChild(modalHeader);

		const idInputGroup = this.addChild(InputGroup);
		const passwordInputGroup = this.addChild(InputGroup);
		const reconfirmInputGroup = this.addChild(InputGroup);
		const studentIdInputGroup = this.addChild(InputGroup);
		const englishLevelInputGroup = this.addChild(InputGroup);
		const signupButton = this.addChild(Button);

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
				key: 'sign-up-loading',
			};

			const idInputProps = {
				name: '아이디',
				placeholder: '6자 이상 20자 이하',
				value: this.state.id,
				onChange: (newValue) => {
					this.setState({ id: newValue });
				},
				isValidation: this.state.isValidationOfId,
				validationCallback: this.validationCallbackOfId.bind(this),
				errorMessage: '6자 이상 20자 이하의 글자를 입력해주세요',
				key: 'sign-up-id',
			};
			const passwordInputProps = {
				name: '비밀번호',
				id: 'password',
				placeholder: '기호(!@#$%^&*)를 포함한 8자 이상 20자 이하',
				value: this.state.password,
				onChange: (newValue) => {
					this.setState({ password: newValue });
				},
				isValidation: this.state.isValidationOfPassword,
				validationCallback: this.validationCallbackOfPassword.bind(this),
				errorMessage: '기호(!@#$%^&*)를 포함한 8자 이상 20자 이하이어야 합니다',
				key: 'sign-up-password',
				type: inputTypes.password,
			};
			const reconfirmInputProps = {
				name: '비밀번호 확인',
				id: 'passwordConfirm',
				placeholder: '',
				value: this.state.reconfirm,
				onChange: (newValue) => {
					this.setState({ reconfirm: newValue });
				},
				isValidation: this.state.isValidationOfReconfirm,
				validationCallback: this.validationCallbackOfReconfirm.bind(this),
				errorMessage: '비밀번호가 일치하지 않습니다.',
				key: 'sign-up-reconfirm',
				type: inputTypes.password,
			};
			const studentIdInputProps = {
				name: '학번',
				placeholder: 'ex)60xxxxxx',
				value: this.state.studentId,
				onChange: (newValue) => {
					this.setState({ studentId: newValue });
				},
				isValidation: this.state.isValidationOfStudentId,
				validationCallback: this.validationCallbackOfStudentId.bind(this),
				errorMessage: '학번 양식(ex)60xxxxxx)을 따라야합니다.',
				key: 'sign-up-studentId',
			};
			const englishLevelInputProps = {
				name: '영어',
				placeholder: '선택해주세요',
				value: this.state.englishLevel,
				type: inputTypes.select,
				options: ['기초영어', 'Level12', 'Level34', '면제'],
				onChange: (newValue) => {
					if (newValue === '기초영어' || newValue === 'Level12') this.setState({ englishLevel: 'ENG12' });
					if (newValue === 'Level34') this.setState({ englishLevel: 'ENG34' });
					if (newValue === '면제') this.setState({ englishLevel: 'FREE' });
				},
				key: 'sign-up-englishLevel',
			};

			return `
        <div class="sign-up-form">		
        ${modalLoadingContainer.render(modalLoadingProps)}
        <div class="sign-up-form__header">${header.render({ title: '회원가입' })}</div>
          <div class="sign-up-form__body">
					<div class="sign-up-form__id-input-group-container sign-up-form__input-group">	${idInputGroup.render(
						idInputProps
					)}</div>       
					<div class="sign-up-form__password-input-group-container sign-up-form__input-group">${passwordInputGroup.render(
						passwordInputProps
					)}</div>
					<div class="sign-up-form__reconfirm-input-group-container sign-up-form__input-group">	${reconfirmInputGroup.render(
						reconfirmInputProps
					)}</div>			
					<div class="sign-up-form__studentId-input-group-container sign-up-form__input-group">${studentIdInputGroup.render(
						studentIdInputProps
					)}</div>
					<div class="sign-up-form__englishLevel-input-group-container sign-up-form__input-group">${englishLevelInputGroup.render(
						englishLevelInputProps
					)}</div>
            <div class="sign-up-form__create-modal-button-container">
	
		${signupButton.render({
			content: '회원가입',
			type: this.validationTotal() ? buttonTypes.primary : buttonTypes.grey,
			size: 'md',
			key: 'modal-display',
			onClick: this.submitData.bind(this),
			disabled: !this.validationTotal(),
		})} 
				
            </div>
			<div class="sign-up-form__footer">
				이미 계정이 있으신가요? 
			<div class="sign-up-form__footer-signin">로그인</div>
         	</div>
        </div>
      `;
		};
	}

	setEvent() {
		this.addEvent('click', '.sign-up-form__footer-signin', () => {
			const { router } = store.getState();
			router.navigate('./sign-in');
		});
	}
}
