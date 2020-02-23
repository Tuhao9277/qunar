import { createStore, combineReducers, applyMiddleware,compose } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { h0 } from './../components/fp'
import {ORDER_DEPART} from './constants'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  combineReducers(reducers),
  {
    from: null,
    to: null,
    departDate: h0(Date.now()),
    highSpeed: false,
    trainList: [],
    orderType:ORDER_DEPART,
    onlyTickets:false,
    ticketTypes:[],
    checkeedTicketTypes:{},
    trainTypes:[],
    checkedTrainTypes:{},
    checkedDepartStattions:{},
    arriveStations:[],
    checkedArriveStatsions:{},
    departTimeStart:0,
    departTimeEnd:24,
    arriveTimeStart:0,
    arriveTimeEnd:24,
    isFiltersVisible:false,
    searchParsed:false,
  },
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
