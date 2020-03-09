import React from 'react'
import classnames from 'classnames'
import './Bottom.css'
import { ORDER_DEPART } from './constants'
import BottomModal from './BottomModal'
import { useMemo } from 'react'

const Bottom = ({
  toggleHighSpeed,
  toggleIsFiltersVisible,
  toggleOnlyTickets,
  toggleOrderType,
  highSpeed,
  orderType,
  onlyTickets,
  isFiltersVisible,
  ...rest
}) => {
  const {
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  } = rest
  const noChecked = useMemo(() => {
    return (
      Object.keys(checkedTicketTypes).length &&
      Object.keys(checkedTrainTypes).length &&
      Object.keys(checkedDepartStations).length &&
      Object.keys(checkedArriveStatsions).length &&
      departTimeStart === 0 &&
      departTimeEnd === 24 &&
      arriveTimeStart === 0 &&
      arriveTimeEnd === 24
    )
  }, [
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  ])
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长'}
        </span>
        <span
          className={classnames('item', { 'item-on': highSpeed })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁动车
        </span>
        <span
          className={classnames('item', { 'item-on': onlyTickets })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span
          className={classnames('item', {
            'item-on': isFiltersVisible || !noChecked,
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{noChecked ? '\uf0f7' : '\uf446'}</i>
          综合筛选
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal
          toggleIsFiltersVisible={toggleIsFiltersVisible}
          {...rest}
        />
      )}
    </div>
  )
}

export default Bottom
