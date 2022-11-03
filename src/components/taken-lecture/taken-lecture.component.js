import Component from '../../core/component';
import Button from '../../components/button/button.component';

import sample from '../../../public/images/sample.png';
import { buttonTypes } from '../../helper/types';

export default class MyInfo extends Component {
	template() {
		return (props) => {
			const takenLectureButton= this.addChild(Button);
		
            if (props) this.setProps(props);

			return `
       <div class="taken-lecture">       
            <div class="taken-lecture__title">마이페이지</div>
            <img src=${sample} class="taken-lecture__totalcredit" />
            <div class="taken-lecture__btn">
                ${takenLectureButton.render({
                    content: '수강현황 자세히보기',
                    type: buttonTypes.primary,
                    size: 'md',
                    key: 'takenLecture',
                })}
            </div>
       </div>
      `;
		};
	}
}
