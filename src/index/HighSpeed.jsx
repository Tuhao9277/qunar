import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './HighSpeed.css'
const HighSpeed = props => {
  const { highSpeed, toggle } = props
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={toggle}>
        <input type="hidden" name="highSpeed" value={highSpeed} />
        <div
          className={classNames('high-speed-track', {
            checked: highSpeed,
          })}
        >
          <span
            className={classNames('high-speed-handle', {
              checked: highSpeed,
            })}
          ></span>
        </div>
      </div>
    </div>
  )
}
HighSpeed.prototypes = {
  highSpeed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default HighSpeed
