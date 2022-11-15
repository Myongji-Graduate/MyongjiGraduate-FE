import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';

const checkSizes = {
	mobile: 40,
	tablet: 50,
	sm: 50,
	md: 60,
	lg: 90,
};
const backgroundSizes = {
	mobile: 540,
	tablet: 700,
	sm: 700,
	md: 8900,
	lg: 1200,
};

const [checkSizeAttr, checkSrcsetAttr] = getResponseiveImage(checkSizes, `${IMAGE_URL}/images/complete-check.svg`);
const [backgroundSizeAttr, backgroundSrcsetAttr] = getResponseiveImage(
	backgroundSizes,
	`${IMAGE_URL}/images/complete-background.png`
);

export default class ResultCompleteContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			const { key } = this.props;

			return `
        <div class="result-complete-content__${key} result-complete-content">
          <img  	  
				sizes="${backgroundSizeAttr}"
				srcset="${backgroundSrcsetAttr}"               
                class="result-complete-content__background" 
                alt="result-complete-content__background" />
          <div class="result-complete-content__content-container">
            <img 
			sizes="${checkSizeAttr}"
			srcset="${checkSrcsetAttr}"        
			class="result-complete-content__check-icon" 
			alt="result-complete-content__check-icon" />
            해당 파트의 졸업요건을 충족하셨습니다!
          </div>
        </div>
      `;
		};
	}
}
