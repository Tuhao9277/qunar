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
  toggleHighSpeed,
  fetchCityData,
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
    highSpeed,
  } = props
  // 返回按钮
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  //城市选择
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
      },
      dispatch,
    )
  }, [dispatch])
  // 显示日期图层
  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector,
      },
      dispatch,
    )
  }, [dispatch])
  // 交换始发站
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector,
      },
      dispatch,
    )
  }, [dispatch])
  // 隐藏日期图层
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector,
      },
      dispatch,
    )
  }, [dispatch])
  // 点击日期回调
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
  // 控制只显示高铁/动车
  const highSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed,
      },
      dispatch,
    )
  }, [dispatch])
  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title="火车票" />
      </div>
      <form className="form" action="./query.html">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
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
