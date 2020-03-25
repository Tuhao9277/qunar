import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers(reducers),
  {
    trainNumber: null,
    departStation: null,
    arriveStation: null,
    seatType: null,
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    durationStr: null,
    price: null,
    passengers: [],
    menu: null,
    isMenuVisible: false,
    searchParsed: false,
  },
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
