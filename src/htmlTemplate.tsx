export const getHtmlTemplate = (el: string): string => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Run Script View</title>
    <script src="/dist/index.js"></script>
  </head>
  <body>
    ${el}
  </body>
</html>
`;
