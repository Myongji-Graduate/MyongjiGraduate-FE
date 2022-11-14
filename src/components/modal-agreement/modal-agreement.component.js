import Component from '../../core/component';
import modalHeader from '../modal-header/modal-header.component';
import Button from '../button/button.component';

import { buttonTypes } from '../../helper/types';
import { store } from '../../store/store';

export default class ModalAgreement extends Component {
	template() {
		const header = this.addChild(modalHeader);
		const agreeModalButton = this.addChild(Button);
		const disagreeModalButton = this.addChild(Button);

		return (props) => {
			if (props) this.setProps(props);

			const disagreeButtonOnClick = () => {
				const { router } = store.getState();
				router.navigate('/sign-in');
			};
			const agreeButtonOnClick = () => {
				const { router } = store.getState();
				router.navigate('/sign-up');
			};

			return `
            <div class ="modal-agreement">
                <div class="modal-agreement__header">${header.render({ title: '약관동의' })}</div>
				<div class="modal-agreement__context">
				<ol>
				<li>현재 검사 가능한 학과-학번은 아래과 같습니다. 검사대상에 속하지 않다면 검사가 불가능합니다. <strong>꼭 검사대상인지 확인하세요!</strong></li>
				</ol>
				<ul>
				<li>대학: 경영대학, 법과대학, 사회과학대학, ICT융합대학, 인문대학, <span class="modal-agreement__important">미래융합대학(불가)</span></li>
				<li>학번: 16 ~ 22학번</li>
				</ul>
				<ol start="2">
				<li><p>교직, 다전공, 편입, 전과, 재외국민/외국인전형에 해당하는 사용자는 검사 기준이 따로 설정되지 않아 검사가 불가능합니다.</p>
				</li>
				<li><p>검사를 위해선 성적표를 직접 업로드해야하므로 <strong>PC환경</strong>에서 진행하는 것을 권장합니다.</p>
				</li>
				<li><p>검사 기준은 최신버전 학사안내문(2022.07.28) 반영하여 설정되었으며, 학사안내문은 매년 개편되므로 자신이 알고 있는 구버전과 다를 수 있습니다.</p>
				</li>
				</ol>
				<ul>
				<li><a target='_blank' href="https://www.mju.ac.kr/mjukr/257/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGbWp1a3IlMkYxNDMlMkYxOTExMjAlMkZhcnRjbFZpZXcuZG8lM0ZwYWdlJTNEMyUyNnNyY2hDb2x1bW4lM0QlMjZzcmNoV3JkJTNEJTI2YmJzQ2xTZXElM0QlMjZiYnNPcGVuV3JkU2VxJTNEJTI2cmdzQmduZGVTdHIlM0QlMjZyZ3NFbmRkZVN0ciUzRCUyNmlzVmlld01pbmUlM0RmYWxzZSUyNmlzVmlldyUzRHRydWUlMjZwYXNzd29yZCUzRCUyNg%3D%3D">명지대학교 학사안내문 참고 링크</a></li>
				</ul>
				<ol start="5">
				<li><p>명지대학교에서 공식적으로 만든 사이트가 아니므로 <strong>검사 결과가 정확하지 않을 수 있습니다.</strong> (반드시 학사안내문을 통한 졸업요건 2차 검증을 해야합니다.)</p>
				</li>
				<li><p>저장된 사용자 데이터베이스는 익명화되어 저장되고 과목추천 및 교양과목 통계에만 사용되며, 익명 다른 용도로 사용되지 않습니다.</p>
				</li>
				<li><p>졸업요건 기준이 잘못 설정되었거나, 오류발생 시 우측 하단 채널톡으로 피드백 부탁드립니다.</p>
				</li>
				</ol>

				</div>
				<div class="modal-agreement__btn">
				${disagreeModalButton.render({
					content: '비동의',
					type: buttonTypes.grey,
					size: 'md',
					key: 'disagree',
					onClick: disagreeButtonOnClick,
				})}
				${agreeModalButton.render({
					content: '약관동의',
					type: buttonTypes.primary,
					size: 'md',
					key: 'agree',
					onClick: agreeButtonOnClick,
				})}
				</div>		
            </div>
      `;
		};
	}
}
