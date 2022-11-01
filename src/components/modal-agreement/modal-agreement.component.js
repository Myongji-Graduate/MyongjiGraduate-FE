import Component from '../../core/component';
import modalHeader from '../modal-header/modal-header.component';
import Button from '../button/button.component';

import { buttonTypes } from '../../helper/types';

export default class ModalAgreement extends Component {
	template() {
		const header = this.addChild(modalHeader);
		const displayModalButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			return `
            <div class ="modal-agreement">
                <div class="modal-agreement__header">${header.render({ title: '약관동의' })}</div>
				<div class="modal-agreement__context"></div>
				<div class="modal-agreement__btn">
				${displayModalButton.render({
					content: '비동의',
					type: buttonTypes.grey,
					size: 'md',
				})}
				${displayModalButton.render({
					content: '약관동의',
					type: buttonTypes.primary,
					size: 'md',
				})}
				</div>		
            </div>
      `;
		};
	}
}
