import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as webpack from "webpack";
import { paths } from "../../config/paths";
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

// type WebpackRuleGenerator = (params: { isEnvDevelopment: boolean; isEnvProduction: boolean }) => { [key: string]: webpack.Rule };

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

export const generateRules = ({ isEnvDevelopment, isEnvProduction }) => {
  // Webpack uses `publicPath` to determine where the app is being served from.
  // It requires a trailing slash, or the file assets will get an incorrect path.
  // In development, we always serve from the root. This makes config easier.
  const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && "/";
  // Some apps do not use client-side routing with pushState.
  // For these, "homepage" can be set to "." to enable relative asset paths.
  const shouldUseRelativeAssetPaths = publicPath === "./";

  // style files regexes
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;

  // common function to get style loaders
  const getStyleLoaders = (cssOptions, preProcessor: any = undefined): webpack.RuleSetUseItem => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: { ...(shouldUseRelativeAssetPaths ? { publicPath: "../../" } : undefined) },
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
      },
      {
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve("postcss-loader"),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: "postcss",
          plugins: () => [
            require("postcss-flexbugs-fixes"),
            require("postcss-preset-env")({
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            }),
          ],
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean);
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      });
    }
    return loaders as webpack.RuleSetUseItem;
  };

  return {
    sourceMapLoader: {
      test: /\.(js|jsx|mjs)$/,
      loader: "source-map-loader",
      enforce: "pre",
      include: paths.appSrc,
    },
    cacheLoader: {
      loader: "cache-loader",
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
    },
    htmlLoader: {
      test: /\.html$/,
      loader: "html-loader",
    },
    urlLoader: {
      test: /\.(jpe?g|png|eot|svg|gif|woff2?|ttf)$/,
      use: [
        {
          // file-loader, mime, url-loaderが必要
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "assets/[name].[ext]?[hash]",
          },
        },
      ],
    },
    fileLoader: {
      test: /\.(jpe?g|png|eot|svg|gif|woff2?|ttf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "assets/[name].[ext]",
          },
        },
      ],
    },
    cssLoader1: {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction && shouldUseSourceMap,
      }),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    },
    cssLoader2: {
      test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction && shouldUseSourceMap,
        modules: true,
        getLocalIdent: getCSSModuleLocalIdent,
      }),
    },
    sassLoader1: {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
        "sass-loader",
      ),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    },
    sassLoader2: {
      test: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
        },
        "sass-loader",
      ),
    },
  };
};
