import React, { memo } from 'react'
import PropTypes from 'prop-types'
import './List.css'

const ListItem = memo(
  ({
    dTime,
    aTime,
    dStation,
    aStation,
    trainNumber,
    time,
    priceMsg,
    dayAfter,
  }) => (
    <li className="list-item">
      <a href="">
        <span className="item-time">
          <em>{dTime}</em>
          <br />
          <em className="em-light">
            {aTime} <i className="time-after">{dayAfter}</i>{' '}
          </em>
        </span>
        <span className="item-stations">
          <em className="em-light">
            <i className="train-station train-start">始</i>
            {dStation}
          </em>
          <br/>
          <em className="em-light">
            <i className="train-station train-end">终</i>
            {aStation}
          </em>
        </span>
        <span className="item-train">
        <em>{trainNumber}</em>
        <br/>
        <em className="em-light">{time}</em>
        </span>
        <span className="item-ticket">
        <em>{priceMsg}</em>
        <br/>
        <em className="em-light-orange">可抢票</em>
        </span>
      </a>
    </li>
  ),
)
const List = memo(({ list }) => {
  return (
    <ul className="list">
      {list.map(item => (
        <ListItem {...item} key={item.trainNumber} />
      ))}
    </ul>
  )
})

List.propTypes = {
  list: PropTypes.array.isRequired,
}

export default List
