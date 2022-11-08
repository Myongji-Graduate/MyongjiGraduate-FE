const ssrTemplate = (content, isLogin, isInit) => `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
