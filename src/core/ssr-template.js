const ssrTemplate = (content, isLogin, isInit) => `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="명지대학교 졸업사정결과 조회서비스 졸업을 부탁해는 
    MyiWeb MSI의 성적표만으로 명지대학교 학생들의 졸업을 위해 필요한 미이수 과목 정보 및 잔여학점 조회, 카테고리별 수강학점현황,
    강의 커스텀을 통한 졸업사정예측 서비스를 원클릭으로 제공합니다.">
    <title>MJU graduate</title>
    <link rel="shortcut icon" href="#">
  </head>
  <body>
  <div class="app-container">${content}</div>
  
  <!-- csr을 위한 script 태그 추가 -->
  <script defer="defer" src="bundle.js"></script>
  <script>
  ${isLogin ? `window.sessionStorage.setItem('isLogin', true);` : ''}
  ${isInit ? `window.sessionStorage.setItem('isInit', true);` : ''}
  </script>
  <!-- / csr을 위한 script 태그 추가 -->
  
  
  </body>
  </html>
`;

export default ssrTemplate;
