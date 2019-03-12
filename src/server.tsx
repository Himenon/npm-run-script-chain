import * as express from "express";
import * as fs from "fs";
import * as path from "path";

export const createServer = (baseDir: string, inputFile: string) => {
  let cacheTemplate: string | undefined;
  const packageJsonFile = path.join(baseDir, inputFile);
  const app = express();
  const pkg = require(packageJsonFile);

  const applyProps = (): string => {
    const props = { raw: pkg };
    const template = cacheTemplate ? cacheTemplate : fs.readFileSync(path.join(baseDir, "build/index.html"), { encoding: "utf-8" });
    cacheTemplate = template;
    return template.replace("{{ SSR_DOM }}", "").replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
  };

  app.use("/static", express.static("build/static"));
  app.use("/stylesheets", express.static("build/stylesheets"));

  app.get("*", (req: express.Request, res: express.Response) => {
    res.send(applyProps());
    res.end();
  });

  return app;
};
