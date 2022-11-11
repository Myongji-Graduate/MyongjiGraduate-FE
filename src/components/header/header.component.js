import Component from '../../core/component';
import GNB from '../GNB/GNB.component';

import { getResponseiveImage } from '../../helper/images';

const backgroundImageSizes = {
	mobile: 650,
	tablet: 1008,
	sm: 1440,
	md: 1920,
	lg: 1920,
};

const [backgroundSizesAttr, backgroundSrcsetAttr] = getResponseiveImage(
	backgroundImageSizes,
	`${IMAGE_URL}/images/sub-background.png`
);

const [backgroundBottomSizesAttr, backgroundBottomSrcsetAttr] = getResponseiveImage(
	backgroundImageSizes,
	`${IMAGE_URL}/images/header-bottom.png`
);

export default class Header extends Component {
	template() {
		const gnb = this.addChild(GNB);
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="header">
					<div class="header__gnb-container">
						${gnb.render()}
					</div>
					<img sizes="${backgroundSizesAttr}" srcset="${backgroundSrcsetAttr}" class="header__background-img" alt="header__background-img" />
					<img sizes="${backgroundBottomSizesAttr}" srcset="${backgroundBottomSrcsetAttr}" class="header__bottom-img" alt="header__bottom-img" />
        </div>
      `;
		};
	}
}
