import { createStore, compose, applyMiddleware } from 'redux'
import { fetchArticle } from './reducers'
import thunk from 'redux-thunk'

const composedEnhacers = typeof window == 'object' && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() :
    compose

const enhancer = compose(applyMiddleware(thunk))

export default createStore(fetchArticle, enhancer)