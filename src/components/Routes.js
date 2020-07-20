import React from 'react'
import Gallery from './Gallery'
import About from './About'
import Article from './Article'

import { Route, Link } from 'react-router-dom'

const Routes = () => (
  <div>
    <div className="nav">
      <Link to='/'>Gallery</Link>
      <Link to='/about'>About</Link>
      <Link to='/article'>Article</Link>
    </div>
    <div>
      <Route exact path="/" component={Gallery}/>
      <Route path="/about" component={About}/>
      <Route path="/article" component={Article}/>
    </div>
  </div>
)

export default Routes