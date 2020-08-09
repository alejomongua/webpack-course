import React from 'react';
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Routes from '../components/Routes'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Provider } from 'react-redux'
import store from '../store'

export default ({clientStats}) => (req, res) => {
  const context = {
    site: req.hostname.split('.')[0]
  }
  
  const app = ReactDomServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  )

  const names = flushChunkNames().concat([`css/${context.site}-theme-css`])
  
  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: names
  }) 

  const template = () => (`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Hello World</title>
        ${styles}
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${js}
        ${cssHash}
      </body>
    </html>
  `)
  
  if (req.path.match(/^\/article\//)){
    const promise = loadArticle(site, slug)
    promise.then(() => {
      res.send(template())
    })
  } else {
    res.send(template())
  }
}
