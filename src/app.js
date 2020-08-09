import React from "react"
import ReactDOM from "react-dom"
import AppRoot from "./components/AppRoot"
import { AppContainer } from "react-hot-loader"
import Data from "../data/bio"
import { Provider } from 'react-redux'
import store from './store'
import { actionTest } from './actions'

function render(Component) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <AppContainer>
        <Component heading={Data.heading} content={Data.bioText} />
      </AppContainer>
    </Provider>,
    document.getElementById("react-root")
  )
}

render(AppRoot)

if (module.hot) {
  module.hot.accept("./components/AppRoot.js", () => {
    const NewAppRoot = require("./components/AppRoot.js").default
    render(NewAppRoot)
  })
}