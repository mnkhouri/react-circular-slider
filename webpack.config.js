const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ["./docs-src/index.tsx"],
  plugins: [
    new HtmlWebpackPlugin({
      template: './docs-src/index.html'
    }),
  ],
  output: {
    path: path.join(__dirname, "docs"),
    filename: '[name].bundle.js',
    clean: true,
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
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    }
  }
};
