import Component from '../../core/component';
import modalHeader from '../modal-header/modal-header.component';
import { getResponseiveImage } from '../../helper/images';

const sizes = {
	mobile: 240,
	tablet: 315,
	sm: 315,
	md: 405,
	lg: 540,
};

const [sizeAttr, srcsetAttr] = getResponseiveImage(sizes, `${IMAGE_URL}/images/notice.png`);

export default class ModalNotice extends Component {
	template() {
		const header = this.addChild(modalHeader);
		return (props) => {
			if (props) this.setProps(props);

			return `
            <div class ="modal-notice">
                <div class="modal-notice__header">${header.render({ title: '2023-2학기 학사정보 업데이트 안내' })}</div>
				<div class="modal-notice__context">
					<img
					class="notice-img"
					sizes="${sizeAttr}"
					srcset="${srcsetAttr}"
					alt="notice-img"
					/>
					<div class="modal-notice__context-text">
						졸업을 부탁해는 학우님들에게 더 정확한 서비스를 제공해드리기 위해 <br/>
						9월 15일 까지 <strong> 2023-2학기 학사정보</strong>를 업데이트 중에 있습니다. </br>
						이에 따라 서비스 결과가 부정확할 수 있음을 안내드리며, 지연된 업데이트 일정에 죄송하다는 말씀을 드립니다.</br>
					</div>
				</div>		
            </div>
			
      `;
		};
	}
}
