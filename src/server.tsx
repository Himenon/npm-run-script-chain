import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import { generateSsrHtml } from "./generator";

export const createServer = (baseDir: string, inputFile: string) => {
  let cacheTemplate: string | undefined;
  const packageJsonFile = path.join(baseDir, inputFile);
  const app = express();
  const pkg = require(packageJsonFile);
  const buildDir = (filename: string): string => path.resolve(__dirname, "../build", filename);

  const applyProps = (): string => {
    const props = { raw: pkg };
    const template = cacheTemplate ? cacheTemplate : fs.readFileSync(buildDir("index.html"), { encoding: "utf-8" });
    cacheTemplate = template;
    const html = generateSsrHtml(props);
    return template.replace("{{ SSR_DOM }}", html).replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
  };

  app.use("/static", express.static(buildDir("static")));
  app.use("/stylesheets", express.static(buildDir("stylesheets")));

  app.get("*", (req: express.Request, res: express.Response) => {
    res.send(applyProps());
    res.end();
  });

  return app;
};
