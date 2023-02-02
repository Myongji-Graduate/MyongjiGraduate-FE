import Component from '../../core/component';
import modalHeader from '../modal-header/modal-header.component';
import { buttonTypes, inputTypes } from '../../helper/types';
import Button from '../button/button.component';
import InputGroup from '../input-group/input-group.component';

export default class ModalSecession extends Component {
	initState() {
		this.state = {
			password: '',
		};
	}

	template() {
		const header = this.addChild(modalHeader);
		const scessionButton = this.addChild(Button);
		const passwordInputGroup = this.addChild(InputGroup);

		const passwordInputProps = {
			id: 'scession-password',
			placeholder: '비밀번호를 입력해주세요',
			value: this.state.password,
			onChange: (newValue) => {
				this.setState({ password: newValue });
			},
			key: 'secession-password',
			type: inputTypes.password,
		};
		return (props) => {
			if (props) this.setProps(props);

			return `
            <div class ="modal-secession">
                <div class="modal-secession__header">${header.render({ title: '회원 탈퇴' })}</div>
				<div class="modal-secession__context">
     			회원탈퇴를 진행하시겠습니까?<br/>
				탈퇴를 진행하려면 <b>비밀번호 입력</b>이 필요합니다.
				<div class="modal-secession__context-input">
				${passwordInputGroup.render(passwordInputProps)}
				${scessionButton.render({
					content: '탈퇴하기',
					type: buttonTypes.primary,
					size: 'sm',
					key: 'scession-btn',
					onClick: null,
				})}
				</div>
				졸업을 부탁해 서비스를 이용해 주셔서 감사합니다.
				</div>		
            </div>
      `;
		};
	}
}
