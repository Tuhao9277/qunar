import React from 'react'
import classNames from 'classnames'
import switchImg from './imgs/switch.svg'
import './Journey.css'

const Journey = props => {
  const { from, to, exchangeFromTo, showCitySelector } = props
  return (
    <div className="journey">
      <div
        className="journey-station"
        onClick={() => {
          showCitySelector(true)
        }}
      >
        <input
          className={classNames('journey-from', 'journey-input')}
          name="from"
          readOnly
          type="text"
          value={from}
        />
      </div>
      <div className="journey-switch" onClick={exchangeFromTo}>
        <img alt="switch" height="40" src={switchImg} width="70" />
      </div>
      <div
        className="journey-station"
        onClick={() => {
          showCitySelector(false)
        }}
      >
        <input
          className={classNames('journey-to', 'journey-input')}
          name="to"
          readOnly
          type="text"
          value={to}
        />
      </div>
    </div>
  )
}

Journey.propTypes = {}

export default Journey
