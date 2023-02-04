import Component from '../../core/component';

import { buttonTypes, inputTypes } from '../../helper/types';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Button from '../button/button.component';

export default class FindPwForm extends Component {
	initState() {
		this.state = {
			id: '',
			studentid: '',
			repassword: '',
			reconfirmpassword: '',
			find: false,
		};
	}

	async submitData() {
		this.setState({ find: !this.state.find });
	}

	template() {
		const header = this.addChild(modalHeader);

		const idInputGroup = this.addChild(InputGroup);
		const studentIdInputGroup = this.addChild(InputGroup);
		const passwordInputGroup = this.addChild(InputGroup);
		const reconfirmInputGroup = this.addChild(InputGroup);
		const signinButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const idInputProps = {
				name: '아이디',
				placeholder: '아이디를 입력해주세요',
				value: this.state.id,
				onChange: (newValue) => {
					this.setState({ id: newValue });
				},
				key: 'find-pw-id',
			};
			const studentIdInputProps = {
				name: '학번',
				placeholder: '학번을 입력해주세요',
				value: this.state.studentid,
				onChange: (newValue) => {
					this.setState({ studentid: newValue });
				},
				key: 'find-pw-studentId',
			};
			const passwordInputProps = {
				name: '변경할 비밀번호',
				id: 'repassword',
				placeholder: '문자, 숫자, 기호(!@#$%^&*) 조합 8자 이상 20자 이하',
				value: this.state.repassword,
				onChange: (newValue) => {
					this.setState({ repassword: newValue });
				},
				// isValidation: this.state.isValidationOfPassword,
				// validationCallback: this.validationCallbackOfPassword.bind(this),
				errorMessage: '문자, 숫자, 기호(!@#$%^&*) 조합 8자 이상 20자 이하이어야 합니다',
				key: 'find-pw-repassword',
				type: inputTypes.password,
			};
			const reconfirmInputProps = {
				name: '변경할 비밀번호 확인',
				id: 'reconfirmpassword',
				placeholder: '',
				value: this.state.reconfirmpassword,
				onChange: (newValue) => {
					this.setState({ reconfirmpassword: newValue });
				},
				// isValidation: this.state.isValidationOfReconfirm,
				// validationCallback: this.validationCallbackOfReconfirm.bind(this),
				errorMessage: '비밀번호가 일치하지 않습니다.',
				key: 'find-pw-reconfirm',
				type: inputTypes.password,
			};

			return `
        <div class="find-pw-form">	
            <div class="find-pw-form-header">${header.render({ title: '비밀번호 재설정' })}</div>
			<div class="find-pw-form__body">
			${
				this.state.find
					? `
							<div class="find-pw-form__body__studentId-input-group-container"> 
								${idInputGroup.render(idInputProps)}
								${studentIdInputGroup.render(studentIdInputProps)}
							</div>                  
						`
					: `
							<div class="find-pw-form__body__studentId-input-group-container"> 
								${passwordInputGroup.render(passwordInputProps)}
								${reconfirmInputGroup.render(reconfirmInputProps)}
							</div>     `
			}
				<div class="find-pw-form__body__create-modal-button-container">
				${signinButton.render({
					content: '확인',
					type: buttonTypes.primary,
					size: 'md',
					key: 'find-pw',
					onClick: this.submitData.bind(this),
				})}
				</div>
			</div>
        </div>
      `;
		};
	}
}
