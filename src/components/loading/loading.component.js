import Component from '../../core/component';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 65,
	tablet: 80,
	sm: 80,
	md: 100,
	lg: 140,
};
const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes,`${IMAGE_URL}/images/loading-image.png`);

export default class Loading extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="loading">
          <img sizes="${sizeAttr}" srcset="${srcsetAttr}" class="loading__loading-img" alt="loading__loading-img" />
        </div>
      `;
		};
	}
}
