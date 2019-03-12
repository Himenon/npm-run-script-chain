import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

export class ServerSideRenderingPlugin {
  constructor(private htmlWebpackPlugin: HtmlWebpackPlugin, private pattern: string) {}

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap("ServerSideRenderingPlugin", compilation => {
      // @ts-ignore
      this.htmlWebpackPlugin.getHooks(compilation).beforeEmit.tap("ServerSideRenderingPlugin", data => {
        const Tool = require("../../lib/generator");
        const raw = require("../../package.json");
        const props = { raw };
        const html = Tool.generateSsrHtml(props);
        data.html = data.html.replace(this.pattern, html);
        data.html = data.html.replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
      });
    });
  }
}
