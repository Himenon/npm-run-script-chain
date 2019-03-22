import * as chokidar from "chokidar";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import { paths } from "../../config/paths";

const GENERATOR_FILE = path.join(paths.appLib, "generateSsrHtml");
const PACKAGE_JSON = path.join(paths.appPath, "package.json");

/**
 * TODO update require libraries at file changes,
 */
export class ServerSideRenderingPlugin {
  private watcher: chokidar.FSWatcher = chokidar.watch([GENERATOR_FILE, PACKAGE_JSON], {
    ignoreInitial: true,
  });
  constructor(private htmlWebpackPlugin: HtmlWebpackPlugin, private pattern: string) {
    this.watcher.on("change", async (filename: string) => {
      const base = path.basename(filename);
      console.log({ base });
    });
  }

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap("ServerSideRenderingPlugin", compilation => {
      // @ts-ignore
      this.htmlWebpackPlugin.getHooks(compilation).beforeEmit.tap("ServerSideRenderingPlugin", data => {
        const Tool = require(GENERATOR_FILE);
        const raw = require(PACKAGE_JSON);
        const props = { raw };
        const html = Tool.generateSsrHtml(props);
        data.html = data.html.replace(this.pattern, html);
        data.html = data.html.replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
      });
    });
  }
}
