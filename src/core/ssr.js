import { router } from '../routers';

export const serverRenderer = (pathname) => `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Side Rendering</title>
  </head>
  <body>
  <div class="app-container">${router.serverRender(pathname)}</div>
  
  <!-- csr을 위한 script 태그 추가 -->
  <script defer="defer" src="bundle.js"></script>
  <!-- / csr을 위한 script 태그 추가 -->
  
  </body>
  </html>
`;

export const path = () => {};
