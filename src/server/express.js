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
import marked from 'marked'
import { loadFront } from 'yaml-front-matter'
import fs from 'fs'
import path from 'path'

const server = express()

server.get('/api/articles/:slug', (req, res) => {
  try {
    const site = req.hostname.split('.')[0]
    const { slug } = req.params
    if (!slug) {
      throw new Error('No article specified')
    }
    const file = path.resolve(__dirname, `../../data/${site}/${slug}.md`)
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        res.status(404).send(err)
        return
      }

      const obj = loadFront(data)
      obj.__content = marked(obj.__content)
      res.json(obj)
    })
  } catch (err) {
    res.status(404).send(err)
  }
})

if (process.env.NODE_ENV === 'production'){
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const render = require('../../build/prod-server-bundle.js').default
    console.log(render)
    const staticMiddleware = expressStaticGzip("dist", {
      enableBrotli: true
    })
  
    server.use(staticMiddleware)
    
    server.use(render({clientStats}))
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
