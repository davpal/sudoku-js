
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let entry = './src/index.js';
let outputPath = __dirname + '/dist';

if (process.env.TESTBUILD) {
  entry = glob.sync(__dirname + '/test/**/*.test.js');
  outputPath = __dirname + '/test-dist';
}

module.exports = {
  entry,
  output: {
    path: outputPath,
    filename: 'main.bundle.js'
  },
  devServer: {
    contentBase: outputPath
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,

        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
        ],
      }
    ]
  }
}
