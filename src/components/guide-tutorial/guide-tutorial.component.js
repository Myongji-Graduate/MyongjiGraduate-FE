import Component from '../../core/component';

import sign from '../../../public/images/sign.png';

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
						<div class="guide-tutorial__body-item">${imgExplain.render({
							img: sign,
							title: '1.',
							explain: '명지대학교 마이아이웹에 접속 후 로그인',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							img: sign,
							title: '2.',
							explain: '학생카드 접속 → 학점 현황 클릭',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							img: sign,
							title: '3.',
							explain: '좌측 성적/졸업 → 성적표(상담용,B4)메뉴 클릭',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							img: sign,
							title: '4.',
							explain: '우측 상단 조회버튼 클릭 후 PDF로 인쇄',
						})}</div>
						<div class="guide-tutorial__body-item">${imgExplain.render({
							img: sign,
							title: '5.',
							explain: '파일 업로드 후 등록하기 버튼 클릭',
						})}</div>
					</div>
				</div>
			`;
		};
	}
}
