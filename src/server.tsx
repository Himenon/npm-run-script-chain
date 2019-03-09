import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as App from "./App";
import * as Tools from "./generator";

export const createServer = (baseDir: string, inputFile: string) => {
  let cacheTemplate: string | undefined;
  const packageJsonFile = path.join(baseDir, inputFile);
  const app = express();
  const pkg = Tools.getPackageJson(packageJsonFile);

  const generateHTML = (el: string): string => {
    const template = cacheTemplate ? cacheTemplate : fs.readFileSync(path.join(baseDir, "build/index.html"), { encoding: "utf-8" });
    cacheTemplate = template;
    return template.replace("{{ SSR_DOM }}", el);
  };

  app.use("/static", express.static("build/static"));
  app.use("/stylesheets", express.static("build/stylesheets"));

  app.get("*", (req: express.Request, res: express.Response) => {
    const hostname = req.headers.host;
    const anchors = Tools.generateAnchorsProps(Object.keys(pkg.scripts), { hostname });
    const treeData = Tools.generateTreeData(req.query.start, pkg);
    const html = renderToStaticMarkup(<App.Component {...{ anchors, treeData }} />);
    res.send(generateHTML(html));
    res.end();
  });

  return app;
};
