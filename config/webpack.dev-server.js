const path = require('path')
const webpack = require('webpack')
const externals = require('./node-externals')

const config = {
  name: 'server',
  entry:  './src/server/render',
  resolve: {
    extensions: ['.js']
  },
  mode: 'development',
  output: {
    filename: 'dev-server-bundle.js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  externals,
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
          'css-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'css-loader',
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
              name: '/img/[name]-[hash:8].[ext]',
              esModule: false,
              emitFile: false
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

module.exports = config
