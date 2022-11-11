import Component from '../../core/component';
import completeCheckIcon from '../../../public/icons/complete-check.svg';
import { getResponseiveImage } from '../../helper/images';


const sizes = {//추후 수정
	mobile: 580,
	tablet: 690,
	sm: 690,
	md: 890,
	lg: 1180,
};

const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes,`${IMAGE_URL}/complete-background.png`);


export default class ResultCompleteContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="result-complete-content">
          <img  	  
				sizes="${sizeAttr}"
				srcset="${srcsetAttr}"               
                class="result-complete-content__background" 
                alt="result-complete-content__background">
          <div class="result-complete-content__content-container">
            <img src=${completeCheckIcon} class="result-complete-content__check-icon" alt="result-complete-content__check-icon">
            해당 파트의 졸업요건을 충족하셨습니다!
          </div>
        </div>
      `;
		};
	}
}
