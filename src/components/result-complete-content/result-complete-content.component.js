import Component from '../../core/component';
import { getResponseiveImage } from '../../helper/images';


const checkSizes = {//추후 수정
	mobile: 580,
	tablet: 690,
	sm: 690,
	md: 890,
	lg: 1180,
};
const backgroundSizes = {//추후 수정
	mobile: 580,
	tablet: 690,
	sm: 690,
	md: 890,
	lg: 1180,
};

const [checkSizeAttr, checkSrcsetAttr] = getResponseiveImage(checkSizes,`${IMAGE_URL}/icons/complete-check.svg`);
const [backgroundSizeAttr, backgroundSrcsetAttr] = getResponseiveImage(backgroundSizes,`${IMAGE_URL}/images/complete-background.png`);


export default class ResultCompleteContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="result-complete-content">
          <img  	  
				sizes="${backgroundSizeAttr}"
				srcset="${backgroundSrcsetAttr}"               
                class="result-complete-content__background" 
                alt="result-complete-content__background">
          <div class="result-complete-content__content-container">
            <img 
			sizes="${checkSizeAttr}"
			srcset="${checkSrcsetAttr}"        
			class="result-complete-content__check-icon" 
			alt="result-complete-content__check-icon">
            해당 파트의 졸업요건을 충족하셨습니다!
          </div>
        </div>
      `;
		};
	}
}
