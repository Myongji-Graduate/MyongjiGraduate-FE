import Component from '../../core/component';

import ImgExplain from '../img-explain/img-explain.component';
import modalHeader from '../modal-header/modal-header.component';

export default class GuideTutorial extends Component {
	template() {
		const header = this.addChild(modalHeader);
		const imgExplain = this.addChild(ImgExplain);
		return (props) => {
			if (props) this.setProps(props);

			return `
				<div class="guide-tutorial">
					<div class="guide-tutorial__header">
					위 정보들을 제공받기 위해서는 여러분의 이수과목 정보가 필요합니다.<br/>
					아래 과정을 따라해주세요😊
					</div>
					${header.render({ title: 'PDF 파일 업로드 방법' })}					
					<div class="guide-tutorial__body">			
					<a class="guide-tutorial__body-link"  target='_blank' href="https://msi.mju.ac.kr/servlet/security/MySecurityStart">
						<div class="guide-tutorial__body-item">	${imgExplain.render({
							fix: false,
							img: 'tutorial0',
							title: '1.',
							explain: 'MyiWeb MSI에 접속 후 로그인(PC환경 권장)',
						})}</div>		
					</a>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							fix: false,
							img: 'tutorial1',
							title: '2.',
							explain: '좌측 성적/졸업 메뉴 → 성적표(상담용,B4)클릭',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							fix: false,
							img: 'tutorial2',
							title: '3.',
							explain: '우측 상단 조회버튼 클릭 → 프린트 아이콘 클릭 (모바일 환경에서는 뜨지 않을 수 있습니다.)',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							fix: false,
							img: 'tutorial3',
							title: '4.',
							explain: '인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼 클릭 (비율이 깨지지 않도록 조심해주세요.)',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							fix: false,
							img: 'tutorial4',
							title: '5.',
							explain: '저장한 파일 업로드',
						})}</div>
					</div>
				</div>
			`;
		};
	}
}
