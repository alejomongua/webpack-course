import React from 'react'

import { Route, Link } from 'react-router-dom'
import universal from 'react-universal-component'
import NotFound from './NotFound'

const UniversalComponent = universal(props => import(`./${props.page}`))

const Routes = () => (
  <div>
    <div className="nav">
      <Link to='/'>Gallery</Link>
      <Link to='/about'>About</Link>
      <Link to='/article/post'>Article</Link>
    </div>
    <div>
      <Route path="/article/:slug" render={({staticContext, match}) => {
        const site = staticContext ?
          staticContext.site :
          location.hostname.split('.')[0]
        return (
          <UniversalComponent page="Article" site={site} match={match} />
        )
      }} />
      <Route path="/about" render={({staticContext}) => {
        const site = staticContext ?
          staticContext.site :
          location.hostname.split('.')[0]
        return (
          <UniversalComponent page="About" site={site} />
        )
      }} />
      
      <Route exact path="/">
        <UniversalComponent page="Gallery" />
      </Route>

      <Route component={NotFound} />
    </div>
  </div>
)

export default Routes