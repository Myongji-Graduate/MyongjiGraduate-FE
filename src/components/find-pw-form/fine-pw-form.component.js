import Component from '../../core/component';
import { store } from '../../store/store';
import { buttonTypes, inputTypes } from '../../helper/types';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Button from '../button/button.component';
import { fetchUserConfirm, fetchPw } from '../../async/auth';

export default class FindPwForm extends Component {
	initState() {
		this.state = {
			id: '',
			studentId: '',
			repassword: '',
			reconfirmpassword: '',
			find: false,
		};
	}

	async resettingPassword() {
		const { id, repassword, reconfirmpassword } = this.state;
		const result = await fetchPw({
			authId: id,
			newPassword: repassword,
			passwordCheck: reconfirmpassword,
		});

		if (result) {
			const { router } = store.getState();
			router.navigate('/sign-in');
		}
	}

	async confirmUser() {
		const { id, studentId } = this.state;
		const formData = {
			id,
			studentNumber: studentId,
		};
		const response = await fetchUserConfirm(formData);
		if (response) {
			this.setState({ find: true });
		}
	}

	setRepassword() {
		const passwordInputGroup = this.addChild(InputGroup);
		const reconfirmInputGroup = this.addChild(InputGroup);

		const { repassword, reconfirmpassword } = this.state;
		const passwordInputProps = {
			name: '변경할 비밀번호',
			id: 'repassword',
			placeholder: '문자, 숫자, 기호(!@#$%^&*) 조합 8자 이상 20자 이하',
			value: repassword,
			onChange: (newValue) => {
				this.setState({ repassword: newValue });
			},
			key: 'find-pw-repassword',
			type: inputTypes.password,
		};
		const reconfirmInputProps = {
			name: '변경할 비밀번호 확인',
			id: 'reconfirmpassword',
			placeholder: '',
			value: reconfirmpassword,
			onChange: (newValue) => {
				this.setState({ reconfirmpassword: newValue });
			},
			key: 'find-pw-reconfirm',
			type: inputTypes.password,
		};

		return `	
		<div class="find-pw-form__body__input-group-container"> 
			<div class="find-pw-form__body__input-group-container-item">
			${passwordInputGroup.render(passwordInputProps)}
			</div> 	
			<div class="find-pw-form__body__input-group-container-item">
			${reconfirmInputGroup.render(reconfirmInputProps)}
			</div> 	
		</div>   
		`;
	}

	template() {
		const header = this.addChild(modalHeader);

		const idInputGroup = this.addChild(InputGroup);
		const studentIdInputGroup = this.addChild(InputGroup);

		const signinButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);
			const { find, id, studentId } = this.state;
			const idInputProps = {
				name: '아이디',
				placeholder: '아이디를 입력해주세요',
				value: id,
				onChange: (newValue) => {
					this.setState({ id: newValue });
				},
				key: 'find-pw-id',
				readonly: find,
			};
			const studentIdInputProps = {
				name: '학번',
				placeholder: '학번을 입력해주세요',
				value: studentId,
				onChange: (newValue) => {
					this.setState({ studentId: newValue });
				},
				key: 'find-pw-studentId',
				readonly: find,
			};
			const signinButtonProps = {
				content: '확인',
				type: buttonTypes.primary,
				size: 'md',
				key: 'find-pw',
				onClick: find ? this.resettingPassword.bind(this) : this.confirmUser.bind(this),
			};

			return `
        <div class="find-pw-form">	
            <div class="find-pw-form-header">${header.render({ title: '비밀번호 재설정' })}</div>
			<div class="find-pw-form__body">
			<div class="find-pw-form__body__input-group-container" > 
				<div class="find-pw-form__body__input-group-container-item">
				${idInputGroup.render(idInputProps)}
				</div> 	
				<div class="find-pw-form__body__input-group-container-item">
				${studentIdInputGroup.render(studentIdInputProps)}
				</div> 	
			</div>
				${find ? this.setRepassword() : ''}
				<div class="find-pw-form__body__button-container">
				${signinButton.render(signinButtonProps)}
				</div>
			</div>
        </div>
      `;
		};
	}
}
