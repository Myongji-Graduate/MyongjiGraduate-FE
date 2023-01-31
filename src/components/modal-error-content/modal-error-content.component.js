import Component from '../../core/component';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 68,
	tablet: 87,
	sm: 87,
	md: 112,
	lg: 150,
};

const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/error-image.png`);

export default class ModalErrorContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { errorMessage } = this.props;

			return `
        <div class="modal-error-content">
          <img 
		   sizes="${sizeAttr}"
		   srcset="${srcsetAttr}"
		   class="modal-error-content__error-img" 
		   alt="modal-error-content__error-img" />
          <div class="modal-error-content__error-message">${errorMessage}</div>
        </div>
      `;
		};
	}
}
