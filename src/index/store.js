import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to:'上海',
    isCitySelectorVisible:false,
    currentySelectingLeftCity:false,
    cityData:null,
    isLoadingCityData:false,
    departDate: Date.now(),
    isDateSelectorVisible: false,
    highspeed:false,
  },
  applyMiddleware(thunk)
)
