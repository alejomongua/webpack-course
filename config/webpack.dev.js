const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    main: './src/main.js'
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use:[
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            query: {
              modules: {
                localIdentName: "[name]-[local]-[hash:4]"
              }
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader'
          }
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            query: {
              inlineRequires: '/img/'
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|jpeg|png)$/,
        use:[
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]-[hash:8].[ext]',
              esModule: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.hbs',
      title: "Link's journey"
    }
    )
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  }
}

module.exports = config
