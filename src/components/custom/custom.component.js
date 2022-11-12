import Component from '../../core/component';

import { buttonTypes } from '../../helper/types';
import Button from '../button/button.component';

export default class Custom extends Component {
	template() {
		const customButton = this.addChild(Button);
		return (props) => {
			if (props) this.setProps(props);

			const { onClick } = this.props;

			return `
       <div class="custom">
			 		<div class="custom__title">기이수과목 커스텀</div>
					<div class="custom__spacer"></div>
					<div class="custom__divider"></div>
					<div class="custom__spacer"></div>
					<div class="custom__spacer"></div>
					<div class="custom__text">
						<div>마이아이웹에서 다운받은 성적표에는 이번 학기 과목들이 반영되지 않으셨죠? 😭</div>
						<div class="custom__spacer"></div>
						<div>또 다음 학기에 들을 과목을 추가해 검사해보고 싶으신가요?</div>
					</div>
					<div class="custom__spacer"></div>
					<div class="custom__spacer"></div>
					<div class="custom__subtitle"><strong>'커스텀 기능'</strong> 으로 원하는 과목을 추가해서 검사해보세요!</div>
					<div class="custom__spacer"></div>
					<div class="custom__spacer"></div>
            <div class="custom__button"> 
            ${customButton.render({
							content: '커스텀하기',
							type: buttonTypes.primary,
							size: 'md',
							key: 'customStart',
							onClick,
						})}   
            </div>    
       </div>
      `;
		};
	}
}
