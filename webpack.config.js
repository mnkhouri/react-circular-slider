const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./docs/index.tsx"],
  output: {
    path: path.join(__dirname, "docs/build"),
    filename: "index.js",
    publicPath: "docs/build/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {}
};
