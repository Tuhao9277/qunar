import React, { memo, useState, useCallback, useMemo, useContext } from 'react'
import URI from 'urijs'
import './Candidate.css'
import { TrainContext } from './../ticket/context/'
import dayjs from 'dayjs'
const Channel = memo(({ name, desc, type }) => {
  const { trainNumber, departStation, arriveStation, departDate } = useContext(
    TrainContext,
  )
  const src = useMemo(() => {
    return new URI('order.html')
      .setSearch('trainNumber', trainNumber)
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', type)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .toString()
  }, [trainNumber, departStation, arriveStation, departDate, type])
  return (
    <div className="channel">
      <div className="middle">
        <div className="name">{name}</div>
        <div className="desc">{desc}</div>
      </div>
      <a href={src} className="buy-wrapper">
        <div className="buy">买票</div>
      </a>
    </div>
  )
})
const Seat = memo(
  ({ type, priceMsg, ticketsLeft, channels, expanded, idx, onToggle }) => (
    <li>
      <div className="bar" onClick={() => onToggle(idx)}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>¥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? '预订' : '收起'}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}
      >
        {channels.map(channel => (
          <Channel key={channel.name} {...channel} type={type} />
        ))}
      </div>
    </li>
  ),
)

const Candidate = memo(({ tickets }) => {
  const [expandedIndex, setExpandedIndex] = useState(-1)

  const onToggle = useCallback(
    idx => setExpandedIndex(idx === expandedIndex ? -1 : idx),
    [expandedIndex],
  )
  return (
    <div className="candidate">
      <ul>
        {tickets.map((ticket, idx) => (
          <Seat
            key={ticket.type}
            {...ticket}
            idx={idx}
            onToggle={onToggle}
            expanded={expandedIndex === idx}
          />
        ))}
      </ul>
    </div>
  )
})
export default Candidate
