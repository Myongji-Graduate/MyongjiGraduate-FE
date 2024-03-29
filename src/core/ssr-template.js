const ssrTemplate = (content) => `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="명지대학교 졸업사정결과 조회서비스 졸업을 부탁해는 
    MyiWeb MSI의 성적표만으로 명지대학교 학생들의 졸업을 위해 필요한 미이수 과목 정보 및 잔여학점 조회, 카테고리별 수강학점현황,
    강의 커스텀을 통한 졸업사정예측 서비스를 원클릭으로 제공합니다.">
    <meta
			property="og:image"
			content="https://github.com/Myongji-Graduate/MyongjiGraduate-FE/assets/75975946/79eb6efd-9def-4a95-9c75-367a81ea3474"
		/>
		<meta property="og:title" content="졸업을 부탁해" />
		<meta
			property="og:description"
			content="명지대학교 졸업사정결과 조회서비스 졸업을 부탁해는 
      MyiWeb MSI의 성적표만으로 명지대학교 학생들의 졸업을 위해 필요한 미이수 과목 정보 및 잔여학점 조회, 카테고리별 수강학점현황,
      강의 커스텀을 통한 졸업사정예측 서비스를 원클릭으로 제공합니다."
		/>
		<meta
			property="twitter:image"
			content="https://github.com/Myongji-Graduate/MyongjiGraduate-FE/assets/75975946/79eb6efd-9def-4a95-9c75-367a81ea3474"
		/>
		<meta property="twitter:title" content="졸업을 부탁해" />
		<meta
			property="twitter:description"
			content="명지대학교 졸업사정결과 조회서비스 졸업을 부탁해는 
      MyiWeb MSI의 성적표만으로 명지대학교 학생들의 졸업을 위해 필요한 미이수 과목 정보 및 잔여학점 조회, 카테고리별 수강학점현황,
      강의 커스텀을 통한 졸업사정예측 서비스를 원클릭으로 제공합니다."
		/>
    <link rel="icon" href="https://github.com/Myongji-Graduate/MyongjiGraduate-BE/assets/75975946/2a7354ae-dffe-4250-8b83-a211a07ff5d2" />
    <title>MJU graduate</title>
  </head>
  <body>
  <div class="app-container">${content}</div>
  <!-- csr을 위한 script 태그 추가 -->
  <script defer="defer" src="${BUILD_FILE}"></script>
  <!-- / csr을 위한 script 태그 추가 -->
  <!-- Channel Plugin Scripts -->
  <script>
    (function() {
      var w = window;
      if (w.ChannelIO) {
        return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
      }
      var ch = function() {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function(args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        s.charset = 'UTF-8';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
      if (document.readyState === 'complete') {
        l();
      } else if (window.attachEvent) {
        window.attachEvent('onload', l);
      } else {
        window.addEventListener('DOMContentLoaded', l, false);
        window.addEventListener('load', l, false);
      }
    })();
    ChannelIO('boot', {
      "pluginKey": "7de47477-379e-47dc-9cf3-3b98ddbceee1"
  });
</script>
<!-- End Channel Plugin -->
  
  </body>
  </html>
`;

export default ssrTemplate;
