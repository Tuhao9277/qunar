import React, { memo } from 'react'
import './Passengers.css'
const Passenger = memo(
  ({
    id,
    name,
    followAdult,
    ticketType,
    licenceNo,
    gender,
    birthday,
    onRemove,
    onUpdate,
    onShow,
  }) => {
    const isAdult = ticketType === 'adult'
    return (
      <li className="passenger">
        <i className="delete" onClick={() => onRemove(id)}></i>
        <ol className="items">
          <li className="item">
            <label htmlFor="adult" className="label">
              姓名
            </label>
            <input
              type="text"
              className="input name"
              id="adult"
              onChange={({ target: { value } }) =>
                onUpdate(id, { name: value })
              }
              placeholder="乘客姓名"
              value={name}
            />
            <label className="ticket-type">
              {isAdult ? '成人票' : '儿童票'}
            </label>
          </li>
          {isAdult && (
            <li className="item">
              <label htmlFor="licenceNo" className="label licenceNo">
                身份证
              </label>
              <input
                type="text"
                className="input name"
                id="licenceNo"
                onChange={({ target: { value } }) =>
                  onUpdate(id, { licenceNo: value })
                }
                placeholder="证件号码"
                value={licenceNo}
              />
            </li>
          )}
          {!isAdult && (
            <li className="item arrow">
              <label htmlFor="licenceChildNo" className="label gender">
                性别
              </label>
              <input
                type="text"
                className="input gender"
                id="licenceChildNo"
                onClick={() => onShow(id)}
                onChange={({ target: { value } }) =>
                  onUpdate(id, { licenceNo: value })
                }
                placeholder="请选择"
                value={
                  gender === 'male' ? '男' : gender === 'female' ? '女' : ''
                }
                readOnly
              />
            </li>
          )}
          {!isAdult && (
            <li className="item">
              <label htmlFor="birthday" className="label birthday">
                出生日期
              </label>
              <input
                type="text"
                className="input gender"
                id="birthday"
                value={birthday}
                onChange={({ target: { value } }) =>
                  onUpdate(id, { birthday: value })
                }
                placeholder="例：19961001"
              />
            </li>
          )}
          {!isAdult && (
            <li className="item arrow">
              <label htmlFor="followAdult" className="label followAdult">
                同行成人
              </label>
              <input
                type="text"
                value={followAdult}
                className="input followAdult"
                id="followAdult"
                onChange={({ target: { value } }) =>
                  onUpdate(id, { followAdult: value })
                }
                placeholder="请选择"
                readOnly
              />
            </li>
          )}
        </ol>
      </li>
    )
  },
)
const Passengers = memo(
  ({
    passengers,
    createAdult,
    createChild,
    updatePassengers,
    removePassenger,
    showGenderMenu,
  }) => {
    return (
      <div className="passengers">
        <ul>
          {passengers.map(passenger => (
            <Passenger
              {...passenger}
              key={passenger.id}
              onRemove={removePassenger}
              onUpdate={updatePassengers}
              onShow={showGenderMenu}
            />
          ))}
        </ul>
        <section className="add">
          <div className="adult" onClick={createAdult}>
            添加成人
          </div>
          <div className="child" onClick={createChild}>
            添加添加儿童
          </div>
        </section>
      </div>
    )
  },
)

export default Passengers
