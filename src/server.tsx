// import * as fs from "fs";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as url from "url";
import { getHtmlTemplate } from "./htmlTemplate";
import { App, AppProps, makeProps } from "./index";

export class Server {
  private app: http.Server;
  private filePath: string;

  constructor(private basePath: string, inputFile: string) {
    this.filePath = path.join(basePath, inputFile);
    this.app = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      // TODO expressならもう少し簡単にかけそう
      if (req.url) {
        const { pathname } = url.parse(req.url);
        if (pathname && pathname.match(/^\/dist\//) && this.loadDistDirectoryFile(res, pathname)) {
          return;
        }
      }
      const jsonData = this.getPackageJson();
      const props: AppProps = makeProps(jsonData, 350, 300);
      const html = renderToStaticMarkup(<App {...props} />);
      res.write(getHtmlTemplate(html));
      res.end();
    });
  }

  public async run(port: number): Promise<string> {
    try {
      const server = await this.app.listen(port);
      const addr = server.address();
      if (typeof addr === "string") {
        return `http://localhost:${addr}/`;
      } else {
        return `http://localhost:${addr.port}/`;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private loadDistDirectoryFile(res: http.ServerResponse, pathname: string): boolean {
    const distFilePath = path.join(this.basePath, pathname);
    if (fs.existsSync(distFilePath) && fs.statSync(distFilePath).isFile()) {
      fs.createReadStream(distFilePath).pipe(res);
      return true;
    }
    return false;
  }

  private getPackageJson() {
    return require(this.filePath);
  }
}
