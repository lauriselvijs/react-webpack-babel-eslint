const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "build"),
    filename: "static/js/main.[contenthash].js",
    clean: true,
    assetModuleFilename: "static/media/[name].[contenthash][ext]",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    historyApiFallback: {
      index: "build/index.html",
    },
    compress: true,
    hot: true,
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        // use: ["style-loader", "css-loader"] if no need for separate css file
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      favicon: "public/favicon.ico",
      manifest: "public/manifest.json",
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/main.[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "public/manifest.json", to: "./" },
        { from: "public/robots.txt", to: "./" },
        { from: "public/logo192.png", to: "./" },
        { from: "public/logo512.png", to: "./" },
      ],
    }),
    new WebpackAssetsManifest({
      output: "asset-manifest.json",
    }),
  ],
};
