import Component from '../../core/component';

export default class FileUploadGuide extends Component {
	template() {
		return (props) => {
			return `
        <div class="file-upload-guide">
          <div class="file-upload-guide--1">1. 명지대학교 마이아이웹에 접속 후 로그인</div>
          <div class="file-upload-guide--2">2. 학생카드 접속 → 학점 현황 클릭</div>
          <div class="file-upload-guide--3">3. 좌측 성적/졸업 메뉴 → 성적표(상담용,B4)클릭</div>
          <div class="file-upload-guide--4">4. 우측 상단 조회버튼 클릭 → PDF로 다운로드 후 해당 파일 업로드 </div>
          <div class="file-upload-guide--5">5. 해당 파일 업로드 </div>
        </div>
      `;
		};
	}
}
