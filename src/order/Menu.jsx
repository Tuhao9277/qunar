import React, { memo } from 'react'
import './Menu.css'
import classnames from 'classnames'
const MenuItem = memo(({ onPress, title, value, active }) => (
  <li
    className={classnames({ active })}
    onClick={() => {
      onPress(value)
    }}
  >
    {title}
  </li>
))
const Menu = memo(({ show, options, onPress, hideMenu }) => {
  return (
    <div>
      {show && <div className="menu-mask" onClick={() => hideMenu()}></div>}
      <div className={classnames('menu', { show })}>
        <div className="menu-title"></div>
          <ul>
            {options &&
              options.map(option => (
                <MenuItem key={option.value} {...option} onPress={onPress} />
              ))}
          </ul>
      </div>
    </div>
  )
})

export default Menu
