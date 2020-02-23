import React, { useMemo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './Nav.css'
import dayjs from 'dayjs'
import  'dayjs/locale/zh-cn'

const Nav = ({ date, prev, next, isPrevDisabled, isNextDisabled }) => {
  const currentgString = useMemo(()=>{
    const d= dayjs(date)
    return d.format('M月D日')+d.locale('zh-cn').format('ddd')
  },[date])
  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classnames('nav-prev', {
          'nav-disabled': isPrevDisabled,
        })}
      >
        前一天
      </span>
      <span className="nav-current">{currentgString}</span>
      <span onClick={next}
      className={classnames('nav-next', {
        'nav-disabled': isNextDisabled,
      })}
      >
      后一天
      </span>
    </div>
  )
}

Nav.propTypes = {}

export default Nav
