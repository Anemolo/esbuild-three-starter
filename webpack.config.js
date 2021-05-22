"use strict";

/**
 * Plugins
 */
const path = require("path");
// const glob = require("glob-all");
// const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
new HtmlWebpackPlugin();
const PATHS = {
  build: "./dist",
  src: path.join(__dirname, "src"),
};

module.exports = {
  //   context: PATHS.src,
  entry: {
    app: ["./src/js/index.js"],
  },
  mode: "development",
  //   watch: true,
  //   devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 1236,
  },
  // Ignore that not all imports are correct.
  ignoreWarnings: [{ module: /GLTFLoader.js/ }],
  output: {
    // publicPath: PATHS.build,
    path: path.join(__dirname, "web", "build"),
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  stats: {
    warnings: false,
  },
  resolve: {
    alias: {
      js: path.resolve(__dirname, "src/js"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    // minimizer: [new ESBuildMinifyPlugin({ target: "es2015" })],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: [/node_modules/, /src/],
        loader: "esbuild-loader",
        options: {
          target: "es2015",
        },
      },

      //   {
      //     test: /\.js$/,
      //     use: "babel-loader",
      //   },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        // exclude: /node_modules/,
        use: [{ loader: "raw-loader" }, { loader: "glslify-loader" }],
      },
      {
        test: [/\.scss$/, /\.css$/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg|fnt)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // new ESBuildPlugin(),
    // important that this is injected in the body so it's attached after the dom
    // or else size calculations are weird
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "body" }),
    // new BundleAnalyzerPlugin(),
  ],
};
