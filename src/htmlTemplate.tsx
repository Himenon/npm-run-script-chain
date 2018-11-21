export const getHtmlTemplate = (el: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Run Script View</title>
    <style>
    * {
      box-sizing: border-box;
      margin: 0;
    }
    body, html, #root {
      padding: 0;
      width: 100%;
      height: 100%;
    }
    #menu {
      float: left;
      width: 20%;
      height: 100%;
      border-right: 1px solid #333;
      padding-top: 2%;
    }
    #tree {
      float: left;
      width: 80%;
      height: 100%;
      padding: 2%;
    }
    </style>
    <script src="/dist/index.js"></script>
  </head>
  <body>
    ${el}
  </body>
</html>
`;
