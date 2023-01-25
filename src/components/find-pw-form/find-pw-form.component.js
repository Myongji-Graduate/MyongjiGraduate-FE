import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Button from '../button/button.component';

export default class FindPwForm extends Component {
	initState() {
		this.state = {
			id: '',
			studentid: '',
			password: '',
			repassword: '',
		};
	}

	async submitData() {}

	template() {
		const header = this.addChild(modalHeader);

		const idInputGroup = this.addChild(InputGroup);
		const studentIdInputGroup = this.addChild(InputGroup);

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

			return `
        <div class="find-pw-form">	
            <div class="find-pw-form-header">${header.render({ title: '비밀번호 찾기' })}</div>
            <div class="find-pw-form__body">
                    <div class="find-pw-form__studentId-input-group-container"> 
					${idInputGroup.render(idInputProps)}
                    ${studentIdInputGroup.render(studentIdInputProps)}
                    </div>                  
                    <div class="find-pw-form__create-modal-button-container">
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
