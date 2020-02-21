import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './../components/Header'
import DepartDate from './DepartDate'
import CitySelector from './../components/CitySelector'
import DateSelector from '../components/DateSelector'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import {
  exchangeFromTo,
  showCitySelector,
  showDateSelector,
  hideCitySelector,
  hideDateSelector,
  setDepartDate,
} from './actions'
import './App.css'
import { h0 } from '../components/fp'
const App = props => {
  const {
    from,
    to,
    dispatch,
    isDateSelectorVisible,
    isCitySelectorVisible,
    departDate,
    cityData,
    isLoadingCityData,
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
      },
      dispatch,
    )
  }, [dispatch])
  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector,
      },
      dispatch,
    )
  }, [dispatch])

  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch,
    )
  }, [dispatch])
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector,
      },
      dispatch,
    )
  }, [dispatch])
  const onSelectDate = useCallback(
    day => {
      if (!day || day < h0()) {
        return
      }
      dispatch(setDepartDate(day))
      dispatch(hideDateSelector())
    },
    [dispatch],
  )
  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <form className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        onSelect={onSelectDate}
        {...dateSelectorCbs}
      />
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
