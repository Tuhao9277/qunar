import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers(reducers),
  {
    departDate:Date.now(),
    arriveDate:Date.now(),
    departTimeStr:null,
    arriveTimeStr:null,
    departStation:null,
    trainNumber:null,
    arriveStation:null,
    durationStr:null,
    tickets:[],
    isScheduleVisible:false,
    searchParsed:false,
  },
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
