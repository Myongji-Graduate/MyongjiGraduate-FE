import Component from '../../core/component';

import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 60,
	tablet: 75,
	sm: 75,
	md: 100,
	lg: 130,
};

const [sizesAttr, srcsetAttr] = getResponseiveImage( sizes, `${IMAGE_URL}/images/main_title_cap.svg`);

export default class maintitle extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="main-title">          
          <div class="main-title__logo">
          <div class="main-title__logo__text">
          <span>졸</span>업을 <span>부</span>탁해
          <img class="main-title__logo__cap" sizes="${sizesAttr}" srcset="${srcsetAttr}" alt="main-title__logo__cap">
            </div>
          </div>
		     <div class="main-title__explain">명지인을 위한 간편 졸업요건 검사 사이트</div>
        </div>
      `;
		};
	}
}
