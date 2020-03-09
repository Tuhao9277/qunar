import React, { memo, useState, useCallback } from 'react'
import classnames from 'classnames'
import './Bottom.css'
import Slider from './Slider'
const Filter = memo(({ name, checked, toggle, value }) => (
  <li className={classnames({ checked })} onClick={() => toggle(value)}>
    {name}
  </li>
))
const Option = memo(({ title, options, checkedMap, update }) => {
  const toggle = useCallback(
    value => {
      const newCheckedMap = { ...checkedMap }
      if (value in checkedMap) {
        delete newCheckedMap[value]
      } else {
        newCheckedMap[value] = true
      }
      update(newCheckedMap)
    },
    [checkedMap, update],
  )
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(option => {
          return (
            <Filter
              key={option.value}
              checked={option.value in checkedMap}
              toggle={toggle}
              {...option}
            />
          )
        })}
      </ul>
    </div>
  )
})

const BottomModal = memo(
  ({
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStatsions,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStattions,
    setCheckedArriveStatsions,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
    toggleIsFiltersVisible,
  }) => {
    const [localCheckedTicketTypes, setlocalCheckedTicketTypes] = useState(
      () => {
        return { ...checkedTicketTypes }
      },
    )
    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
      return { ...checkedTrainTypes }
    })
    const [
      localCheckedDepartStations,
      setLocalCheckedDepartStations,
    ] = useState(() => {
      return { ...checkedDepartStations }
    })
    const [
      localCheckedArriveStations,
      setLocalCheckedArriveStations,
    ] = useState(() => {
      return { ...checkedArriveStatsions }
    })

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
      departTimeStart,
    )
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd)
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
      arriveTimeStart,
    )
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd)
    const optionGroup = [
      {
        title: '座位类型',
        options: ticketTypes,
        checkedMap: localCheckedTicketTypes,
        update: setlocalCheckedTicketTypes,
      },
      {
        title: '车次类型',
        options: trainTypes,
        checkedMap: localCheckedTrainTypes,
        update: setLocalCheckedTrainTypes,
      },
      {
        title: '出发车站',
        options: departStations,
        checkedMap: localCheckedDepartStations,
        update: setLocalCheckedDepartStations,
      },
      {
        title: '到达车站',
        options: arriveStations,
        checkedMap: localCheckedArriveStations,
        update: setLocalCheckedArriveStations,
      },
    ]
    const handleSure = () => {
      setCheckedTicketTypes(localCheckedTicketTypes)
      setCheckedTrainTypes(localCheckedTrainTypes)
      setCheckedDepartStattions(localCheckedDepartStations)
      setCheckedArriveStatsions(localCheckedArriveStations)

      setDepartTimeStart(localDepartTimeStart)
      setDepartTimeEnd(localDepartTimeEnd)

      setArriveTimeStart(localArriveTimeStart)
      setArriveTimeEnd(localArriveTimeEnd)
      toggleIsFiltersVisible()
    }
    const reset = () => {
      setlocalCheckedTicketTypes({})
      setLocalCheckedTrainTypes({})
      setLocalCheckedDepartStations({})
      setLocalCheckedArriveStations({})
      setLocalDepartTimeStart(0)
      setLocalDepartTimeEnd(24)
      setLocalArriveTimeStart(0)
      setLocalArriveTimeEnd(24)
    }
    return (
      <div className="bottom-modal">
        <div className="bottom-dialog">
          <div className="bottom-dialog-content">
            <div className="title">
              <span className="reset" onClick={reset}>
                重置
              </span>

              <span className="ok" onClick={handleSure}>
                确定
              </span>
            </div>
            <div className="options">
              {optionGroup.map(group => (
                <Option {...group} key={group.title} />
              ))}
              <Slider
                title="出发时间"
                currentStartHours={localDepartTimeStart}
                currentEndHours={localDepartTimeEnd}
                onStartChanged={setLocalDepartTimeStart}
                onEndChanged={setLocalDepartTimeEnd}
              />
              <Slider
                title="到达时间"
                currentStartHours={localArriveTimeStart}
                currentEndHours={localArriveTimeEnd}
                onStartChanged={setLocalArriveTimeStart}
                onEndChanged={setLocalArriveTimeEnd}
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
)

export default BottomModal
