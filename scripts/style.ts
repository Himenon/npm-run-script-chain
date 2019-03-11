process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

import * as glob from "glob";
import * as path from "path";
import * as webpack from "webpack";
import { paths } from "../config/paths";
import { plugins } from "./webpack/plugins";
import { rules as defaultRules } from "./webpack/rules";

process.on("unhandledRejection", err => {
  throw err;
});
const entries: { [key: string]: string } = {};

glob.sync("./src/**/*.scss").map(filepath => {
  entries[path.basename(filepath)] = filepath;
});

const config: webpack.Configuration = {
  entry: entries,
  output: {
    path: paths.appLib,
  },
  plugins: [plugins.MiniCssExtractPlugin()],
  module: {
    rules: [defaultRules.styleLoader],
  },
};

const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  }
});
