const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js')
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devtool: ' inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env']]
            }
          }
        ]
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [__dirname + '/src/components/helpers']
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './',
              emitFile: true
            }
          }
        ]
      }
    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      filename : 'index.html',
      template : path.resolve(__dirname, 'src/templates/index.hbs'),
      data : JSON.parse(fs.readFileSync('./src/data/data.json'))
    }),
    new CopyWebpackPlugin([{
      from : 'src/img',
      to : '.'
    }])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true
  }
};
