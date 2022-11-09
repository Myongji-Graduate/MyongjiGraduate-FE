import Component from '../../core/component';

import ErrorImage from '../../../public/images/error-image.png';

export default class ModalErrorContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { errorMessage } = this.props;

			return `
        <div class="modal-error-content">
          <img src=${ErrorImage} class="modal-error-content__error-img" alt="modal-error-content__error-img" />
          <div class="modal-error-content__error-message">${errorMessage}</div>
					<div class="modal-error-content__help-message">도와주세요</div>
        </div>
      `;
		};
	}
}
