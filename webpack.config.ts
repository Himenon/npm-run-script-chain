import * as fs from "fs";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import * as webpack from "webpack";
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

export const plugins: webpack.Plugin[] = [
  // new BundleAnalyzerPlugin(),
  new TsconfigPathsPlugin({
    configFile: resolveApp("tsconfig.json"),
  }),
  // ts-loader | tslint を別プロセスで動かす
  new ForkTsCheckerWebpackPlugin({
    async: true,
    watch: resolveApp("src"),
    tsconfig: resolveApp("tsconfig.json"),
    tslint: resolveApp("tslint.json"),
  }),
  // https://github.com/jantimon/html-webpack-plugin/issues/218
  new HtmlWebpackPlugin({
    chunks: ["index"],
    template: "./src/index.html",
    filename: "index.html",
  }),
];

export const defaultRules: { [key: string]: webpack.Rule } = {
  cacheLoader: {
    loader: "cache-loader",
  },
  sourceMapLoader: {
    test: /\.(js|jsx|mjs)$/,
    loader: "source-map-loader",
    enforce: "pre",
    include: resolveApp("src"),
  },
  tsLoader: {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
    exclude: /node_modules/,
  },
  htmlLoader: {
    test: /\.html$/,
    loader: "html-loader",
  },
};

const OUTPUT_DIR = "dist";

const module: webpack.Configuration[] = [
  {
    mode: "development",
    stats: "errors-only",
    entry: {
      index: resolveApp("src/index.tsx"),
    },
    devtool: "cheap-module-source-map",
    output: {
      path: resolveApp(OUTPUT_DIR),
      chunkFilename: "[name].chunk.js",
      filename: "[name].js",
    },
    module: {
      rules: [defaultRules.cacheLoader, defaultRules.tsLoader, defaultRules.htmlLoader],
    },
    plugins,
    resolve: {
      extensions: [".mjs", ".web.ts", ".ts", ".web.tsx", ".tsx", ".web.js", ".js", ".json", ".web.jsx", ".jsx"],
      alias: {},
    },
    node: {
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
      __dirname: false,
      __filename: false,
    },
  },
];

export default module;
