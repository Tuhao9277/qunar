import React, { memo, useState, useEffect } from 'react'
import URI from 'urijs'
import classnames from 'classnames'
import './Schedule.css'
import dayjs from 'dayjs'
const ScheduleRow = memo(
  ({
    index,
    station,
    arriveTime,
    departTime,
    stay,
    isStartStation,
    isEndStation,
    isDepartStation,
    isArriveStation,
    beforeDepartStation,
    afterArriveStation,
  }) => (
    <li>
      <div
        className={classnames('icon', {
          'icon-red': isDepartStation || isArriveStation,
        })}
      >
        {isDepartStation ? '出' : isArriveStation ? '到' : String(index).padStart(2, 0)}
      </div>
      <div
        className={classnames('row', {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        <span
          className={classnames('station', {
            red: isArriveStation || isDepartStation,
          })}
        >
          {station}
        </span>
        <span
          className={classnames('arrtime', {
            red: isArriveStation,
          })}
        >
          {isStartStation ? '始发站' : arriveTime}
        </span>
        <span
          className={classnames('deptime', {
            red: isDepartStation,
          })}
        >
          {isArriveStation ? '终到站' : departTime}
        </span>
        <span className="stoptime">
          {(isStartStation || isEndStation) ? '--' : stay + '分'}
        </span>
      </div>
    </li>
  ),
)
const Schedule = memo(({ date, trainNumber, departStation, arriveStation }) => {
  const [scheduleList, setScheduleList] = useState([])
  async function fetchData() {
    const url = new URI('/rest/schedule')
      .setSearch('trainNumber', trainNumber)
      .setSearch('departStation', departStation)
      .setSearch('arriveStation', arriveStation)
      .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
      .toString()
    const resp = await fetch(url)
    const data = await resp.json()
    let departRow, arriveRow
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      if (!departRow) {
        if (element.station === departStation) {
          departRow = Object.assign(element, {
            beforeDepartStation: false,
            isDepartStation: true,
            afterArriveStation: false,
            isArriveStation: false,
          })
        } else {
          Object.assign(element, {
            beforeDepartStation: true,
            isDepartStation: false,
            afterArriveStation: false,
            isArriveStation: false,
          })
        }
      } else if (!arriveRow) {
        if (element.station === arriveStation) {
          arriveRow = Object.assign(element, {
            beforeDepartStation: false,
            isDepartStation: false,
            afterArriveStation: false,
            isArriveStation: true,
          })
        } else {
          Object.assign(element, {
            beforeDepartStation: false,
            isDepartStation: false,
            afterArriveStation: false,
            isArriveStation: false,
          })
        }
      } else {
        Object.assign(element, {
          beforeDepartStation: false,
          isDepartStation: false,
          afterArriveStation: true,
          isArriveStation: false,
        })
      }
      Object.assign(element, {
        isStartStation: i === 0,
        isEndStation: i === data.length - 1,
      })
    }
    setScheduleList(data)
  }
  useEffect( () => {
    fetchData()
  }, [date, trainNumber, departStation, arriveStation])
  return (
    <div className="schedule">
      <span className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => (
            <ScheduleRow key={schedule.station} index={index + 1} {...schedule} />
          ))}
        </ul>
      </span>
    </div>
  )
})

export default Schedule
