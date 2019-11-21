import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './../components/Header'
import DepartDate from './DepartDate'
import CitySelector from './../components/CitySelector'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import { exchangeFromTo, showCitySelector, hideCitySelector } from './actions'
import './App.css'
const App = props => {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
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
  }, [])
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch,
    )
  }, [])
  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <form className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
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
