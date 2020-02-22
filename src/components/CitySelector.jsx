import React, { useState, useMemo, useEffect, memo, useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './CitySelector.css'

const SuggestItem = memo(({ name, onClick }) => (
  <li className="city-suggest-li" onClick={() => onClick(name)}>{name}</li>
))
const Suggest = memo(({ searchKey, onSelect }) => {
  const [result, setResult] = useState([])
  useEffect(() => {
    fetch(`/rest/search?key=${encodeURIComponent(searchKey)}`)
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data
        if (sKey === searchKey) setResult(result)
      })
  }, [searchKey])
  const fallBackResult = useMemo(() => {
    return result.length ? result : [{ display: searchKey }]
  }, [result, searchKey])
  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {
          fallBackResult.map(({ display }) => {
            return(
          <SuggestItem key={display} name={display} onClick={onSelect} />
        )})}
      </ul>
    </div>
  )
})
const AlphaIndex = memo(({ alpha, onClick }) => (
  <i className="city-index-item" onClick={() => onClick(alpha)}>
    {alpha}
  </i>
))

const alphaBet = Array.from(new Array(26), (ele, index) =>
  String.fromCharCode(65 + index),
)

const CityItem = memo(({ name, onSelect }) => (
  <li className="city-li" onClick={() => onSelect(name)}>
    {name}
  </li>
))

const CitySection = memo(({ title, onSelect, cities = [] }) => (
  <ul className="city-ul">
    <li className="city-li" data-cate={title}>
      {title}
    </li>
    {cities.map(({ name }) => (
      <CityItem key={name} name={name} onSelect={onSelect} />
    ))}
  </ul>
))
const CityList = memo(({ sections, onSelect, toAlpha }) => (
  <div className="city-list">
    <div className="city-cate">
      {sections.map(({ title, citys }) => (
        <CitySection
          key={title}
          onSelect={onSelect}
          title={title}
          cities={citys}
        />
      ))}
    </div>
    <div className="city-index">
      {alphaBet.map(alpha => (
        <AlphaIndex onClick={toAlpha} key={alpha} alpha={alpha} />
      ))}
    </div>
  </div>
))

const CitySelector = memo(props => {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props
  const [searchKey, setSearchKey] = useState('')
  const key = useMemo(() => searchKey.trim(), [searchKey])
  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
  }, [])
  useEffect(() => {
    if (!show || cityData || isLoading) {
      return
    }
    fetchCityData()
  }, [show, cityData, isLoading])
  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading...</div>
    }
    if (cityData) {
      const { cityList } = cityData
      return (
        <CityList sections={cityList} toAlpha={toAlpha} onSelect={onSelect} />
      )
    }
  }
  return (
    <div
      className={classNames('city-selector', {
        hidden: !show,
      })}
    >
      <div className="city-search">
        <div className="search-back" onClick={() => onBack()}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            className="search-input"
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          className={classNames('search-clean', {
            hidden: key.length === 0,
          })}
          onClick={() => setSearchKey('')}
        >
          &#xf063;
        </i>
      </div>
      {Boolean(key) && (
        <Suggest
          searchKey={key}
          onSelect={key=>onSelect(key)}
        />
      )}
      {outputCitySections()}
    </div>
  )
})

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  cityData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
}

export default CitySelector
