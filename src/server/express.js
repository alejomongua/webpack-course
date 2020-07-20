import express from 'express'
import webpack from 'webpack'
import expressStaticGzip from 'express-static-gzip'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import configDevClient from '../../config/webpack.dev-client.js'
import configProdClient from '../../config/webpack.prod-client.js'
import configDevServer from '../../config/webpack.dev-server.js'
import configProdServer from '../../config/webpack.prod-server.js'


const server = express()

if (process.env.NODE_ENV === 'production'){
  webpack([configProdClient, configProdServer]).run(() => {
    const render = require('../../build/prod-server-bundle.js').default
    console.log(render)
    const staticMiddleware = expressStaticGzip("dist", {
      enableBrotli: true
    })
  
    server.use(staticMiddleware)
    
    server.use(render())
  })
} else {
  const compiler = webpack([configDevClient, configDevServer])
  const compilerClient = compiler.compilers[0]
  const compilerServer = compiler.compilers[1]

  require('webpack-mild-compile')(compilerServer)
  const configWebpackDevMiddleware = webpackDevMiddleware(
    compiler,
    configDevClient.devServer
  )
    
  const configWebpackHotMiddleware = webpackHotMiddleware(
    compilerClient,
    configDevServer.devServer
  )
  
  server.use(configWebpackDevMiddleware)
  server.use(configWebpackHotMiddleware)
  
  server.use(webpackHotServerMiddleware(compiler))
}

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Server is now listening on port ${PORT}`)
})
