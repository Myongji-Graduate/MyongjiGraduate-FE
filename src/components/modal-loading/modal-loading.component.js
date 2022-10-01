import Component from '../../core/component';

import loadingImage from '../../../public/images/loading-image.png';

export default class ModalLoading extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="modal-loading">
          <img src=${loadingImage} class="modal-loading__loading-img" />
          <div class="modal-loading__content">
            로딩중입니다...
          </div>
        </div>
      `;
		};
	}
}
