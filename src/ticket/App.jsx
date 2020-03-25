import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import dayjs from 'dayjs'
import URI from 'urijs'
import { TrainContext } from './context'
import { h0 } from './../components/fp'
import Header from './../components/Header'
import Nav from './../components/Nav'
import useNav from './../components/useNav'
import Detail from './../components/Detail'
import Candidate from './../components/Candidate'
import './App.css'
import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  prevDate,
  nextDate,
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible,
} from './actions'
const Schedule = lazy(() => import('./../components/Schedule'))
function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    durationStr,
    trainNumber,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search)
    const { aStation, dStation, date, trainNumber } = queries
    dispatch(setDepartStation(dStation))
    dispatch(setArriveStation(aStation))
    dispatch(setTrainNumber(trainNumber))
    dispatch(setDepartDate(h0(dayjs(date).valueOf())))
    dispatch(setSearchParsed(true))
  }, [])
  useEffect(() => {
    document.title = trainNumber
  }, [trainNumber])
  useEffect(() => {
    if (!searchParsed) {
      return
    }
    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString()
    fetch(url).then(res => {
      res.json().then(result => {
        const {
          detail: { departTimeStr, arriveTimeStr, arriveDate, durationStr },
          candidates,
        } = result
        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveTimeStr(arriveTimeStr))
        dispatch(setArriveDate(arriveDate))
        dispatch(setDurationStr(durationStr))
        dispatch(setTickets(candidates))
      })
    })
  }, [searchParsed, departDate, trainNumber])
  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate,
  )
  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible,
      },
      dispatch,
    )
  }, [])
  if (!searchParsed) {
    return null
  }
  return (
    <div>
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack}></Header>
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
      </div>
      <div className="detail-wrapper">
        <Detail
          {...detailCbs}
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
        >
          <span className="left" />
          <span className="schedule" onClick={toggleIsScheduleVisible}>
            时刻表{' '}
          </span>
          <span className="right" />
        </Detail>
      </div>
      <TrainContext.Provider
        value={{
          trainNumber,
          departStation,
          arriveStation,
          departDate,
        }}
      >
        <Candidate tickets={tickets} />
      </TrainContext.Provider>
      {isScheduleVisible && (
        <div
          className="mask"
          onClick={() => detailCbs.toggleIsScheduleVisible()}
        >
          <Suspense fallback={<div>loading...</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}
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
