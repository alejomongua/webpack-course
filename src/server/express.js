import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../config/webpack.dev.js'
import webpackHotMiddleware from 'webpack-hot-middleware'

const compiler = webpack(webpackConfig)
const server = express()
const staticMiddleware = express.static("dist")

const configWebpackDevMiddleware = webpackDevMiddleware(
  compiler,
  webpackConfig.devServer
)

const configWebpackHotMiddleware = webpackHotMiddleware(compiler)

server.use(staticMiddleware)
server.use(configWebpackDevMiddleware)
server.use(configWebpackHotMiddleware)

server.listen(8000, () => {
  console.log('Server is now listening')
})
