import Component from '../../core/component';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 68,
	tablet: 87,
	sm: 87,
	md: 112,
	lg: 150,
};

const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes,`${IMAGE_URL}/images/success_maru.png`);

export default class ModalSuccessContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { successMessage } = this.props;

			return `
        <div class="modal-success-content">
          <img 
		   sizes="${sizeAttr}"
		   srcset="${srcsetAttr}"
		   class="modal-success-content__success-img" 
		   alt="modal-success-content__success-img" />
          <div class="modal-success-content__success-message">${successMessage}</div>
        </div>
      `;
		};
	}
}
