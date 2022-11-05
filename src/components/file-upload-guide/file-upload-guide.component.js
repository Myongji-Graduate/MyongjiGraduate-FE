import Component from '../../core/component';

export default class FileUploadGuide extends Component {
	template() {
		return () => {
			return `
        <div class="file-upload-guide">
          <div class="file-upload-guide--1">
           1. <a class="file-upload-guide--1__link"  target='_blank' href="https://msi.mju.ac.kr/servlet/security/MySecurityStart">
           MyiWeb MSI</a>에 접속 후 로그인         
          </div>
          <div class="file-upload-guide--2">2. 좌측 성적/졸업 메뉴 → 성적표(상담용,B4)클릭</div>
          <div class="file-upload-guide--3">3. 우측 상단 조회버튼 클릭 → 프린트 아이콘 클릭</div>
          <div class="file-upload-guide--4">4. 인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼 클릭 </div>
          <div class="file-upload-guide--5">5. 저장한 파일 업로드 </div>
        </div>
      `;
		};
	}
}
