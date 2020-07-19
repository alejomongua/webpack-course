import express from 'express'
import webpack from 'webpack'
import expressStaticGzip from 'express-static-gzip'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../config/webpack.dev.js'
import webpackHotMiddleware from 'webpack-hot-middleware'

const server = express()

const isProd = process.env.NODE_ENV === 'production'
if (!isProd){
  const compiler = webpack(webpackConfig)
  const configWebpackDevMiddleware = webpackDevMiddleware(
    compiler,
    webpackConfig.devServer
  )
  
  const configWebpackHotMiddleware = webpackHotMiddleware(compiler)
  
  server.use(configWebpackDevMiddleware)
  server.use(configWebpackHotMiddleware)
  
}

//const staticMiddleware = express.static("dist")
const staticMiddleware = expressStaticGzip("dist", {
  enableBrotli: true
})
server.use(staticMiddleware)

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`)
})
