import React from 'react'
import classNames from 'classnames'
import Header from './Header'
import PropTypes from 'prop-types'
import './DateSelector.css'
import { h0 } from './../components/fp'

const Day = props => {
  const { day, onSelect } = props
  if (!day) {
    return <td className="null" />
  }
  const classes = []
  const now = h0()
  if (day < now) {
    classes.push('disabled')
  }
  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend')
  }
  const dateString = now === day ? '今天' : new Date(day).getDate()
  return <td onClick={()=>onSelect(day)} className={classNames(classes)}>{dateString}</td>
}
const Week = props => {
  const { days, onSelect } = props
  return (
    <tr className="date-table-days">
      {days.map((day,idx) => (
        <Day day={day} key={idx} onSelect={onSelect} />
      ))}
    </tr>
  )
}
const Month = props => {
  const { startingTimeInMonth, onSelect } = props
  const startDay = new Date(startingTimeInMonth)
  const currentDay = new Date(startingTimeInMonth)
  let days = []
  while (currentDay.getMonth() === startDay.getMonth()) {
    days.push(currentDay.getTime())
    currentDay.setDate(currentDay.getDate() + 1)
  }
  days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
    .fill(null)
    .concat(days)
  const lastDay = new Date(days[days.length - 1])
  days = days.concat(
    new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null),
  )
  const weeks = []
  for (let row = 0; row < days.length / 7; row++) {
    const week = days.slice(row * 7, (row + 1) * 7)
    weeks.push(week)
  }
  return (
    <table className="date-table">
      <thead>
        <tr>
          <td colSpan="7">
            <h5>
              {startDay.getFullYear()}年{startDay.getMonth() + 1}月
            </h5>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="date-table-weeks">
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
          <th className="weekend">周日</th>
        </tr>
        {weeks.map(week => (
          <Week key={week} days={week} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  )
}
const DateSelector = props => {
  const { show, onSelect, onBack } = props
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  now.setDate(1)
  const monthSequence = [now.getTime()]
  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime())
  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime())
  return (
    <div className={classNames('date-selector', { hidden: !show })}>
      <Header title="日期选择" onBack={onBack} />
      <div className="date-selector-tables">
        {monthSequence.map(month => (
          <Month key={month} startingTimeInMonth={month} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
}
Month.prototypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
}
Week.prototypes = {
  week: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
}
Day.prototypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
}
export default DateSelector
