import React from 'react'
import '../main.sass'
import '../nav.sass'
import '../content.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'

class AppRoot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    )
  }
}

export default AppRoot