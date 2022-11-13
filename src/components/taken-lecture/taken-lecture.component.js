import Component from '../../core/component';
import Button from '../button/button.component';

import { buttonTypes } from '../../helper/types';
import { store } from '../../store/store';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 580,
	tablet: 690,
	sm: 690,
	md: 890,
	lg: 1180,
};

const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/taken-lecture-image.png`);

export default class TakenLecture extends Component {
	setDefaultProps() {
		this.props = {
			totalCredit: 0,
		};
	}

	template() {
		const takenLectureButton = this.addChild(Button);
		return (props) => {
			if (props) this.setProps(props);

			const { totalCredit } = this.props;

			const moveResultOnClick = () => {
				const { router } = store.getState();
				router.navigate('/result');
			};
			return `
       <div class="taken-lecture">       
            <div class="taken-lecture__title">마이페이지</div>
            <div class="taken-lecture__total-credit-container">
                <div class="taken-lecture__total-credit-text">총 기준학점 중 <span class="taken-lecture__total-credit-text-point">${totalCredit}</span>학점을 수강하셨습니다!</div>
                <img 
								sizes="${sizeAttr}"
								srcset="${srcsetAttr}"
								class="taken-lecture__total-credit-image" 
								alt="taken-lecture__total-credit-image" />
            </div>
            <div class="taken-lecture__btn">
                ${takenLectureButton.render({
									content: '수강현황 자세히보기',
									type: buttonTypes.primary,
									size: 'md',
									key: 'taken-Lecture',
									onClick: moveResultOnClick,
								})}
            </div>
       </div>
      `;
		};
	}
}
