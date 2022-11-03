import Component from '../../core/component';
import modalHeader from '../modal-header/modal-header.component';
import Button from '../button/button.component';

import { buttonTypes } from '../../helper/types';
import { store } from '../../store/store';

export default class ModalAgreement extends Component {

	template() {
		const header = this.addChild(modalHeader);
		const agreeModalButton = this.addChild(Button);
		const disagreeModalButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const disagreeButtonOnClick = () => {
				const { router } = store.getState();
				router.navigate('/sign-in');

			};
			const agreeButtonOnClick = () => {
				const { router } = store.getState();
				router.navigate('/sign-up');
			};

			return `
            <div class ="modal-agreement">
                <div class="modal-agreement__header">${header.render({ title: '약관동의' })}</div>
				<div class="modal-agreement__context"></div>
				<div class="modal-agreement__btn">
				${disagreeModalButton.render({
					content: '비동의',
					type: buttonTypes.grey,
					size: 'md',
					key: 'disagree',
					onClick: disagreeButtonOnClick,
				})}
				${agreeModalButton.render({
					content: '약관동의',
					type: buttonTypes.primary,
					size: 'md',
					key: 'agree',
					onClick: agreeButtonOnClick,
				})}
				</div>		
            </div>
      `;
		};
	}
}
