import Component from '../../core/component';

import completeBackgroundImage from '../../../public/images/complete-background.png';
import completeCheckIcon from '../../../public/icons/complete-check.svg';

export default class ResultCompleteContent extends Component {
	template() {
		return (props) => {
			if (props) this.setProps(props);

			return `
        <div class="result-complete-content">
          <img src=${completeBackgroundImage} class="result-complete-content__background" alt="result-complete-content__background">
          <div class="result-complete-content__content-container">
            <img src=${completeCheckIcon} class="result-complete-content__check-icon" alt="result-complete-content__check-icon">
            해당 파트의 졸업요건을 충족하셨습니다!
          </div>
        </div>
      `;
		};
	}
}
