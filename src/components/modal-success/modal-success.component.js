import Component from '../../core/component';

import Modal from '../modal/modal.component';
import ModalSuccessContent from '../modal-success-content/modal-success-content.component';
import { createAction, store } from '../../store/store';
import { SUCCESS_ACTION_TYPES } from '../../store/types';

export default class ModalSuccess extends Component {
	toggleModal() {
		store.dispatch(createAction(SUCCESS_ACTION_TYPES.HIDE_SUCCESS));
	}

	template() {
		const modal = this.addChild(Modal);
		const modalSuccessContent = this.addChild(ModalSuccessContent);

		return (props) => {
			if (props) this.setProps(props);

			const { success } = store.getState();
			const isShow = !!success.code;

			const modalSuccessContentProps = {
				successMessage: success.message,
			};

			return `
        <div class="modal-success">
          ${modal.render({
						toggleModal: this.toggleModal,
						isModalShow: isShow,
						contentComponent: modalSuccessContent,
						contentComponentProps: modalSuccessContentProps,
						width: 790,
						padding: 132,
						key: 'success-modal',
					})}
        </div>
      `;
		};
	}
}
