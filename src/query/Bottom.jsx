import React from 'react'
import classnames from 'classnames'
import './Bottom.css'
import { ORDER_DEPART } from './constants'
import BottomModal from './BottomModal'

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
            'item-on': isFiltersVisible,
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{'\uf0f7'}</i>
          综合筛选
        </span>
      </div>
      {
        isFiltersVisible && (
          <BottomModal
          toggleIsFiltersVisible={toggleIsFiltersVisible}
          {...rest}
          />
        )
      }
    </div>
  )
}

export default Bottom
