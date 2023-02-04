import Component from '../../core/component';
import { store } from '../../store/store';
import { buttonTypes } from '../../helper/types';

import modalHeader from '../modal-header/modal-header.component';
import InputGroup from '../input-group/input-group.component';
import Button from '../button/button.component';

import { fetchId } from '../../async/auth';

export default class FindIdForm extends Component {
	initState() {
		this.state = {
			studentId: '',
			find: false,
		};
	}

	async submitData() {
		// test 코드
		this.setState({ find: true, isLoading: true });
		//
		const result = await fetchId({
			studentId: this.state.studentId,
		});
		this.setState({
			isLoading: false,
		});
		// if (result) this.setState({ find: true });
	}

	template() {
		const header = this.addChild(modalHeader);

		const studentIdInputGroup = this.addChild(InputGroup);
		const findIdButton = this.addChild(Button);
		const LoginButton = this.addChild(Button);
		const findPwButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const goSignIn = () => {
				const { router } = store.getState();
				router.navigate('/sign-in');
			};
			const goFindPw = () => {
				const { router } = store.getState();
				router.navigate('/find-pw');
			};

			const studentIdInputProps = {
				name: '학번',
				placeholder: '학번을 입력해주세요',
				value: this.state.studentId,
				onChange: (newValue) => {
					this.setState({ studentId: newValue });
				},
				key: 'find-id-studentId',
				buttonKey: 'find-id',
			};
			const signInBtnProps = {
				content: '로그인하기',
				type: buttonTypes.primary,
				size: 'md',
				key: 'find-id-signIn',
				onClick: goSignIn,
			};
			const findPwBtnProps = {
				content: '비밀번호 찾기',
				type: buttonTypes.primary,
				size: 'md',
				key: 'find-id-findPw',
				onClick: goFindPw,
			};
			const findIdBtnProps = {
				content: '확인',
				type: buttonTypes.primary,
				size: 'md',
				key: 'find-id',
				onClick: this.submitData.bind(this),
			};

			return `
        <div class="find-id-form">	
            <div class="find-id-form-header">${header.render({ title: '아이디 찾기' })}</div>
           ${
							this.state.find
								? `<div class="find-id-form__body">
									<div class="find-id-form__body__content">
										<div class="find-id-form__body__content-explain">입력하신 정보와 일치하는 아이디입니다.</div>
										<div class="find-id-form__body__content-value">id01244</div>
									</div>                  
									<div class="find-id-form__button-container">
									${LoginButton.render(signInBtnProps)}
									<div class="find-id-form__button-between"></div>
									${findPwButton.render(findPwBtnProps)}
									</div>
								  </div>`
								: `<div class="find-id-form__body">
									<div class="find-id-form__studentId-input-group-container"> 
									${studentIdInputGroup.render(studentIdInputProps)}
									</div>                  
									<div class="find-id-form__button-container">
									${findIdButton.render(findIdBtnProps)}
									</div>
								  </div>`
						}
        </div>
      `;
		};
	}
}
