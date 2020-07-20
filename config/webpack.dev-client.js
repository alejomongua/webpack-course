const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const config = {
  name: 'client',
  entry: {
    main: [
      '@babel/runtime/regenerator',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './src/main'
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js']
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    chunkFilename: '[name].js'
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'postcss-loader'

        ]
      },
      {
        test: /\.sass$/,
        use: [
          ExtractCssChunks.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
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
      },
      {
        test: /\.md$/,
        use:[
          { loader: 'markdown-with-front-matter-loader' }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      hot: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = config
