import React, { useCallback, useEffect } from 'react'
import URI from 'urijs'
import { connect } from 'react-redux'
import Header from '././../components/Header'
import Account from './Account'
import Detail from './../components/Detail'
import Choose from './Choose'
import Passengers from './Passengers'
import Ticket from './Ticket'
import Menu from './Menu'
import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInital,
  showGenderMenu,
  hideMenu,
  createAdult,
  createChild,
  removePassenger,
  updatePassengers,
} from './action'
import './App.css'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
const App = ({
  trainNumber,
  departStation,
  arriveStation,
  seatType,
  departDate,
  arriveDate,
  departTimeStr,
  arriveTimeStr,
  durationStr,
  price,
  passengers,
  menu,
  isMenuVisible,
  searchParsed,
  dispatch,
}) => {
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const { trainNumber, dStation, aStation, type, date } = queries
    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setSeatType(type))
    dispatch(setDepartDate(dayjs(date).valueOf()))
    dispatch(setSearchParsed(true))
  }, [])
  useEffect(() => {
    if (!searchParsed) {
      return
    }
    const url = new URI('/rest/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
    dispatch(fetchInital(url))
  }, [searchParsed, departStation, arriveStation, seatType, departDate])
  const menuCbs = useMemo(()=>{
    return bindActionCreators({
      hideMenu,
    },
    dispatch)
  },[])
  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        removePassenger,
        updatePassengers,
        showGenderMenu,
      },
      dispatch,
    )
  }, [])

  if (!searchParsed) {
    return null
  }

  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
        <div className="detail-wrapper">
          <Detail
            departDate={departDate}
            arriveDate={arriveDate}
            departTimeStr={departTimeStr}
            arriveTimeStr={arriveTimeStr}
            trainNumber={trainNumber}
            departStation={departStation}
            arriveStation={arriveStation}
            durationStr={durationStr}
          >
            <span className="left"></span>
            <span className="schedule">时刻表 </span>
            <span className="right"></span>
          </Detail>
        </div>
        <Ticket price={price} type={seatType} />
        <Passengers passengers={passengers} {...passengersCbs} />
        <Menu show={isMenuVisible} {...menu} {...menuCbs} />
      </div>
    </div>
  )
}

export default connect(
  function mapState(state) {
    return state
  },
  function mapDispatch(dispatch) {
    return { dispatch }
  },
)(App)
