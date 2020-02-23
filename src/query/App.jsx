import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Nav from './../components/Nav'
import Header from './../components/Header'
import URI from 'urijs'
import { h0 } from './../components/fp'
import useNav from './../components/useNav'

import List from './List'
// import Bottom from './Bottom'
import {
  setFrom,
  setTo,
  setDepartdate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setArriveStations,
  prevDate,
  nextDate,
} from './action'
import dayjs from 'dayjs'

const App = props => {
  const {
    trainList,
    from,
    to,
    dispatch,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkeedTicketTypes,
    checkedTrainTypes,
    checkedDepartStattions,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const { from, to, date, highSpeed } = queries
    dispatch(setFrom(from))
    dispatch(setTo(to))
    dispatch(setHighSpeed(highSpeed === 'true'))
    dispatch(setDepartdate(h0(dayjs(date).valueOf())))
    dispatch(setSearchParsed(true))
  }, [])
  useEffect(() => {
    if (!searchParsed) {
      return
    }
    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('highSpeed', highSpeed)
      .setSearch('searchParsed', searchParsed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch('checkeedTicketTypes', Object.keys(checkeedTicketTypes).join())
      .setSearch('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .setSearch(
        'checkedDepartStattions',
        Object.keys(checkedDepartStattions).join(),
      )
      .setSearch(
        'checkedArriveStatsions',
        Object.keys(checkedArriveStatsions).join(),
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString()
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, depStation, arrStation },
            },
          },
        } = data
        dispatch(setTrainList(trains))
        dispatch(setTicketTypes(ticketType))
        dispatch(setTrainTypes(depStation))
        dispatch(setArriveStations(arrStation))
      })
  }, [
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkeedTicketTypes,
    checkedTrainTypes,
    checkedDepartStattions,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  ])
  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate,
  )
  if (!searchParsed) {
    return null
  }
  return (
    <div>
      <Header title={`${from} → ${to}`} onBack={onBack} />
      <Nav
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      />
      <List  list={trainList}/>
      {
        // <Bottom />
      }
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
