import React from 'react'

import { Route, Link } from 'react-router-dom'
import universal from 'react-universal-component'

const UniversalComponent = universal(props => import(`./${props.page}`))

const Routes = () => (
  <div>
    <div className="nav">
      <Link to='/'>Gallery</Link>
      <Link to='/about'>About</Link>
      <Link to='/article'>Article</Link>
    </div>
    <div>
      <Route exact path="/">
        <UniversalComponent page="Gallery" />
      </Route>
      <Route path="/about">
        <UniversalComponent page="About" />
      </Route>
      <Route path="/article">
        <UniversalComponent page="Article" />
      </Route>
    </div>
  </div>
)

export default Routes