import React from 'react';
import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import Routes from '../components/Routes'

export default () => (req, res) => {
  const html = `
  <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>Hello World</title>
    <link href="main.css" rel="stylesheet" />
  </head>
  <body>
    <div id="react-root">${ReactDomServer.renderToString(
      <StaticRouter location={req.url} context={{}}>
        <Routes />
      </StaticRouter>
    )}</div>
    <script src="main-bundle.js"></script>
  </body>
</html>
`
  res.send(html)
}
