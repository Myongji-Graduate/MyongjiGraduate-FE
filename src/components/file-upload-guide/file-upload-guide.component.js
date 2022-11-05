import Component from '../../core/component';

export default class FileUploadGuide extends Component {
	template() {
		return () => {
			return `
        <div class="file-upload-guide">
          <div class="file-upload-guide--1">
           1. <a class="file-upload-guide--1__link"  target='_blank' href="https://sso1.mju.ac.kr/login.do?redirect_uri=https://portal.mju.ac.kr/proc/Login.eps">
           명지대학교 마이아이웹</a>에 접속 후 로그인         
          </div>
          <div class="file-upload-guide--2">2. 학생정보시스템(MSI) 클릭</div>
          <div class="file-upload-guide--3">3. 좌측 성적/졸업 메뉴 → 성적표(상담용,B4)클릭</div>
          <div class="file-upload-guide--4">4. 우측 상단 조회버튼 클릭 → 프린트 아이콘 클릭</div>
          <div class="file-upload-guide--5">5. 인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼 클릭 </div>
          <div class="file-upload-guide--6">6. 저장한 파일 업로드 </div>
        </div>
      `;
		};
	}
}
