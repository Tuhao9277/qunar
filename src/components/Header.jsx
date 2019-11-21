import React from 'react'
import PropTypes from 'prop-types'
import './Header.css'

const Header = props => {
  const { onBack, title } = props
  return (
    <div className="header">
      <div className="header-back" onClick={onBack}>
        <svg height="42" width="42">
          <polyline
              fill="none"
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
          />
        </svg>
      </div>
      <h1 className="header-title">{title}</h1>
    </div>
  )
}

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Header
