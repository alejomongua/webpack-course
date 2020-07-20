const path = require('path')
const webpack = require('webpack')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BrotliCompressionPlugin = require('brotli-webpack-plugin')

const config = {
  name: 'client',
  entry: {
    main: './src/main'
  },
  resolve: {
    extensions: ['.js']
  },
  mode: 'production',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].js',
    publicPath: '/'
  },
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
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          ExtractCssChunks.loader,
          { loader: 'css-loader' },
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
        test: /\.(jpg|gif|jpeg|png)$/,
        use:[
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]-[hash:8].[ext]',
              esModule: false,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
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
    new OptimizeCssAssetsPlugin(),
    new ExtractCssChunks(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MinifyPlugin(),
    new CompressionWebpackPlugin({
      algorithm: 'gzip'
    }),
    new BrotliCompressionPlugin()
  ]
}

module.exports = config
