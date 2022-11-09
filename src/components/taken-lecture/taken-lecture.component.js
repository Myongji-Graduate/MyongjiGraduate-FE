import Component from '../../core/component';
import Button from '../button/button.component';

import takenLectureImage from '../../../public/images/taken-lecture-image.png';
import takenLectureImageMobile from '../../../public/images/taken-lecture-image-mobile.png';
import { buttonTypes } from '../../helper/types';
import { store } from '../../store/store';

export default class TakenLecture extends Component {
	template() {
		const takenLectureButton = this.addChild(Button);
		return (props) => {
			if (props) this.setProps(props);

			const moveResultOnClick = () => {
				const { router } = store.getState();
				router.navigate('/result');
			};

			return `
       <div class="taken-lecture">       
            <div class="taken-lecture__title">마이페이지</div>
            <div class="taken-lecture__total-credit-container">
                <div class="taken-lecture__total-credit-text">샛별님, 총 기준학점 중 <span class="taken-lecture__total-credit-text-point">70</span>학점을 수강하셨습니다!</div>
                <img src=${takenLectureImage} srcset="${takenLectureImageMobile} 650w, ${takenLectureImage} 1920w" class="taken-lecture__total-credit-image" alt="taken-lecture__total-credit-image" />
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
