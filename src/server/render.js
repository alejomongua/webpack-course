import React from 'react';
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Routes from '../components/Routes'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

export default ({clientStats}) => (req, res) => {
  const app = ReactDomServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      <Routes />
    </StaticRouter>
  )

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  }) 

  const html = `
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
`
  res.send(html)
}
