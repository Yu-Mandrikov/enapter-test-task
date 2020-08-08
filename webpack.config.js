const HTMLPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname + "/dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname + "/dist"),
    historyApiFallback: true,
  },
  plugins: [
    new HTMLPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".css"],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
