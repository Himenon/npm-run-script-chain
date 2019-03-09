// import * as fs from "fs";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as url from "url";
import * as App from "./App";
import * as Anchor from "./components/Anchor";
import { getHtmlTemplate } from "./htmlTemplate";
import { makeChain, Package } from "./parser";
import { TreeData } from "./types";

export class Server {
  private app: http.Server;
  private filePath: string;
  private START_QUERY_KEY = "start";

  constructor(private basePath: string, inputFile: string) {
    this.filePath = path.join(basePath, inputFile);
    this.app = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
      // TODO expressならもう少し簡単にかけそう
      let startKey: string = "Please set Query Params `?start=any`";
      if (req.url) {
        const { pathname, query } = url.parse(req.url, true);
        if (query && query[this.START_QUERY_KEY]) {
          const key = query[this.START_QUERY_KEY];
          startKey = typeof key === "string" ? key : startKey;
        }
        if (pathname && pathname.match(/^\/dist\//) && this.loadDistDirectoryFile(res, pathname)) {
          return;
        }
      }
      const pkg = this.getPackageJson();
      const hostname = req.headers.host;
      const anchors: Anchor.Props[] = Object.keys(pkg.scripts).map(key => ({
        text: key,
        href: `http://${hostname}/?start=${key}`,
      }));
      if (!(startKey in pkg.scripts)) {
        const menu = renderToStaticMarkup(Anchor.createAnchors(anchors));
        res.write(getHtmlTemplate(menu));
        res.end();
        return;
      }
      const treeData: TreeData = {
        name: startKey,
        children: [],
      };
      makeChain(treeData, pkg);
      const props: App.Props = {
        treeData,
        anchors,
      };
      const html = renderToStaticMarkup(<App.Component {...props} />);
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
      } else if (addr) {
        return `http://localhost:${addr.port}/`;
      } else {
        return `http://localhost:8000/`;
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

  private getPackageJson(): Package {
    return require(this.filePath);
  }
}
