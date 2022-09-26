export const serverRenderer = (RootComponent) => `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <title>Server Side Rendering</title>
  </head>
  <body>
  <div class="app-container">${RootComponent}</div>
  
  <!-- csr을 위한 script 태그 추가 -->
  <script defer="defer" src="bundle.js"></script>
  <!-- / csr을 위한 script 태그 추가 -->
  
  </body>
  </html>
`;