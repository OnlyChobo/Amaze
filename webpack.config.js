var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env']
          }
        },
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", ".css", "*"]
  }
}
