const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    background: './src/js/background.js',
    content: './src/js/content.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  cache: true,
  devtool: 'eval-cheap-module-source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './manifest.json' },
      { from: './src/images' },
      { from: './src/css' },
    ]),
  ],
}
