import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

let finalCreateStore
if (
  process.env.NOT_ENV !== 'production' &&
  window.__REDUX__DEVTOOLS__EXTENSION__
) {
  finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),

    window.__REDUX__DEVTOOLS__EXTENSION__(),
  )(createStore)
} else {
  finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
}

export default createStore(rootReducer, finalCreateStore)
