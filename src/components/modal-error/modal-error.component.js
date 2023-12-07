import Component from '../../core/component';

import Modal from '../modal/modal.component';
import ModalErrorContent from '../modal-error-content/modal-error-content.component';
import { createAction, store } from '../../store/store';
import { ERROR_ACTION_TYPES } from '../../store/types';

export default class ModalError extends Component {
	toggleModal() {
		store.dispatch(createAction(ERROR_ACTION_TYPES.HIDE_ERROR));
	}

	template() {
		const modal = this.addChild(Modal);
		const modalErrorContent = this.addChild(ModalErrorContent);

		return (props) => {
			if (props) this.setProps(props);

			const { error } = store.getState();
			const isShow = !!error.status;

			const modalErrorContentProps = {
				errorMessage: error.message,
			};

			return `
        <div class="modal-error">
          ${modal.render({
						toggleModal: this.toggleModal,
						isModalShow: isShow,
						contentComponent: modalErrorContent,
						contentComponentProps: modalErrorContentProps,
						width: 790,
						padding: 132,
						key: 'error-modal',
					})}
        </div>
      `;
		};
	}
}
