import Component from '../../core/component';
import modalHeader from '../modal-header/modal-header.component';

export default class ModalNotice extends Component {
	template() {
		const header = this.addChild(modalHeader);

		return (props) => {
			if (props) this.setProps(props);

			return `
            <div class ="modal-notice">
                <div class="modal-notice__header">${header.render({ title: '정식서비스 출시 안내' })}</div>
				<div class="modal-notice__context">
        <p><strong>졸업을 부탁해 서비스의 정식버전이 출시되었습니다.</strong></p>
<p>베타버전 일주일간 총 <strong>1200</strong>명의 사용자, 12개의 버그리포트가 접수되었습니다.
학우분들의 많은 관심에 감사드리고 성원에 입어 졸업을 부탁해가 정식버전 출시로 강하게 돌아왔습니다.</p>
<p>앞으로도 더욱 발전하는 졸부가 되겠습니다. 감사합니다.</p>
<p><strong>📋 업데이트 사항</strong></p>
<ol>
<li>졸업사정결과 정확도 개선</li>
<li>기이수 과목 조회 기능 추가</li>
<li>사용자 ux/ui 개선</li>
<li>랜더링 퍼포먼스 개선</li>
</ol>
<p><em>- 졸업을 부탁해 베타버전 버그리포트에 참여해주신 학우분들에게 모두 감사드리며 당첨자는 개별적으로 연락드릴 예정입니다.</em></p>
<p><em>- 문의는 서비스 우측 하단 채널톡을 이용해 주시면 답변드리도록 하겠습니다.</em></p>
				</div>		
            </div>
      `;
		};
	}
}
