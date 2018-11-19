"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var appDirectory = fs.realpathSync(process.cwd());
exports.resolveApp = function (relativePath) { return path.resolve(appDirectory, relativePath); };
exports.plugins = [
    // new BundleAnalyzerPlugin(),
    new tsconfig_paths_webpack_plugin_1.TsconfigPathsPlugin({
        configFile: exports.resolveApp("tsconfig.json")
    }),
    // ts-loader | tslint を別プロセスで動かす
    new ForkTsCheckerWebpackPlugin({
        async: true,
        watch: exports.resolveApp("src"),
        tsconfig: exports.resolveApp("tsconfig.json"),
        tslint: exports.resolveApp("tslint.json")
    }),
];
exports.defaultRules = {
    cacheLoader: {
        loader: "cache-loader"
    },
    sourceMapLoader: {
        test: /\.(js|jsx|mjs)$/,
        loader: "source-map-loader",
        enforce: "pre",
        include: exports.resolveApp("src")
    },
    tsLoader: {
        test: /\.tsx?$/,
        use: [
            {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true
                }
            },
        ],
        exclude: /node_modules/
    },
    htmlLoader: {
        test: /\.html$/,
        loader: "html-loader"
    }
};
var OUTPUT_DIR = "dist";
var module = [
    {
        mode: "development",
        stats: "errors-only",
        entry: {
            index: exports.resolveApp("src/index.tsx")
        },
        devtool: "cheap-module-source-map",
        output: {
            path: exports.resolveApp(OUTPUT_DIR),
            chunkFilename: "[name].chunk.js",
            filename: "[name].js"
        },
        module: {
            rules: [exports.defaultRules.cacheLoader, exports.defaultRules.tsLoader, exports.defaultRules.htmlLoader]
        },
        plugins: exports.plugins,
        resolve: {
            extensions: [".mjs", ".web.ts", ".ts", ".web.tsx", ".tsx", ".web.js", ".js", ".json", ".web.jsx", ".jsx"],
            alias: {}
        },
        node: {
            dgram: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty",
            __dirname: false,
            __filename: false
        }
    },
];
exports["default"] = module;
