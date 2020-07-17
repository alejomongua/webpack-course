import React from 'react'
import Counter from './counter'
import { hot } from 'react-hot-loader'

const App = () => (
  <Counter />
)

export default hot(module)(App)


