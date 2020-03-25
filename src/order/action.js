export const ACTION_SET_TRAINNUMBER = 'SET_TRAINNUMBER'
export const ACTION_SET_DEPARTSTATION = 'SET_DEPARTSTATION'
export const ACTION_SET_ARRIVESTATION = 'SET_ARRIVESTATION'
export const ACTION_SET_SEATTYPE = 'SET_SEATTYPE'
export const ACTION_SET_DEPARTDATE = 'SET_DEPARTDATE'
export const ACTION_SET_ARRIVEDATE = 'SET_ARRIVEDATE'
export const ACTION_SET_DEPARTTIMESTR = 'SET_DEPARTTIMESTR'
export const ACTION_SET_ARRIVETIMESTR = 'SET_ARRIVETIMESTR'
export const ACTION_SET_DURATIONSTR = 'SET_DURATIONSTR'
export const ACTION_SET_PRICE = 'SET_PRICE'
export const ACTION_SET_PASSENGERS = 'SET_PASSENGERS'
export const ACTION_SET_MENU = 'SET_MENU'
export const ACTION_SET_ISMENUVISIBLE = 'SET_ISMENUVISIBLE'
export const ACTION_SET_SEARCHPARSED = 'SET_SEARCHPARSED'
export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAINNUMBER,
    payload: trainNumber,
  }
}
export function setDepartStation(departStation) {
  return {
    type: ACTION_SET_DEPARTSTATION,
    payload: departStation,
  }
}
export function setArriveStation(arriveStation) {
  return {
    type: ACTION_SET_ARRIVESTATION,
    payload: arriveStation,
  }
}
export function setSeatType(seatType) {
  return {
    type: ACTION_SET_SEATTYPE,
    payload: seatType,
  }
}
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPARTDATE,
    payload: departDate,
  }
}
export function setArriveDate(arriveDate) {
  return {
    type: ACTION_SET_ARRIVEDATE,
    payload: arriveDate,
  }
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPARTTIMESTR,
    payload: departTimeStr,
  }
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVETIMESTR,
    payload: arriveTimeStr,
  }
}
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATIONSTR,
    payload: durationStr,
  }
}
export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price,
  }
}
export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers,
  }
}
export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu,
  }
}
export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_ISMENUVISIBLE,
    payload: isMenuVisible,
  }
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCHPARSED,
    payload: searchParsed,
  }
}
export function fetchInital(url) {
  return (dispatch, getState) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price,
        } = data
        dispatch(setDepartTimeStr(departTimeStr))
        dispatch(setArriveDate(arriveTimeStr))
        dispatch(setArriveDate(arriveDate))
        dispatch(setDurationStr(durationStr))
        dispatch(setPrice(price))
      })
  }
}
let passengerIdSeed = 0
export function createAdult() {
  return (dispatch, getState) => {
    const { passengers } = getState()
    for (const passenger of passengers) {
      const keys = Object.keys(passenger)
      for (const key of keys) {
        if (!passenger[key]) {
          return
        }
      }
    }
    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          ticketType: 'adult',
          licenceNo: '',
          seat: 'Z',
        },
      ]),
    )
  }
}

export function createChild() {
  return (dispatch, getState) => {
    const { passengers } = getState()
    let adultFound = null
    for (const passenger of passengers) {
      const keys = Object.keys(passenger)
      for (const key of keys) {
        if (!passenger[key]) {
          return
        }
      }
      if (passenger.ticketType === 'adult') {
        adultFound = passenger.name
      }
    }
    if (!adultFound) {
      // eslint-disable-next-line no-alert
      alert('请至少正确添加一个同行成人！')
      return
    }
    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: '',
          gender: 'none',
          birthday: '',
          followAdult: adultFound,
          ticketType: 'child',
          seat: 'Z',
        },
      ]),
    )
  }
}
export function removePassenger(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    const newPassengers = passengers.filter(passenger => {
      return passenger.id !== id && passenger.followAdult !== id
    })
    dispatch(setPassengers(newPassengers))
  }
}
export function updatePassengers(id, data) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    for (let i = 0; i < passengers.length; i++) {
      const element = passengers[i]
      if (element.id === id) {
        const newPassengers = [...passengers]
        newPassengers[i] = Object.assign({}, passengers[i], data)
        dispatch(setPassengers(newPassengers))
        break
      }
    }
  }
}
export function showMenu(menu) {
  return dispatch => {
    dispatch(setMenu(menu))
    dispatch(setIsMenuVisible(true))
  }
}
export function hideMenu() {
  return setIsMenuVisible(false)
}

export function showGenderMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    const passenger = passengers.find(passenger => passenger.id === id)
    if (!passenger) {
      return
    }
    dispatch(
      showMenu({
        onPress(gender) {
          dispatch(updatePassengers(id, { gender }))
          dispatch(hideMenu())
        },
        options: [
          {
            title: '男',
            value: 'male',
            active: 'male' === passenger.gender,
          },
          {
            title: '女',
            value: 'female',
            active: 'female' === passenger.gender,
          },
        ],
      }),
    )
  }
}
export function showFollowAdultMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()
    const passenger = passengers.find(passenger => passenger.id === id)
    if (!passenger) return
    dispatch(
      showMenu({
        onPress(followAdult) {
          dispatch(updatePassengers(id, { followAdult }))
          dispatch(hideMenu())
        },
        options: passengers
          .filter(passenger => passenger.ticketType === 'adult')
          .map(adult => ({
            title: adult.name,
            value: adult.id,
            active: adult.id === passenger.followAdult,
          })),
      }),
    )
  }
}
export function showTicketTypeMenu(id) {
  return (dispatch, getState) => {
    const { passengers } = getState()

    const passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) {
      return
    }
    dispatch(
      showMenu({
        onPress(ticketType) {
          if ('adult' === ticketType) {
            dispatch(
              updatePassengers(
                id,
                {
                  ticketType,
                  licenceNo: '',
                },
                ['gender', 'followAdult', 'birthday'],
              ),
            )
          } else {
            const adult = passengers.find(
              passenger =>
                passenger.id === id && passenger.ticketType === 'adult',
            )
            if (adult) {
              dispatch(
                updatePassengers(
                  id,
                  {
                    ticketType,
                    gender: '',
                    followAdult: adult.id,
                    birthday: '',
                  },
                  ['licenceNo'],
                ),
              )
            } else {
              // eslint-disable-next-line no-alert
              alert('没有其他乘客')
            }
          }
          dispatch(hideMenu())
        },
        options: [
          {
            title: '成人票',
            value: 'adult',
            active: 'adult' === passenger.ticketType,
          },
          {
            title: '儿童票',
            value: 'child',
            active: 'child' === passenger.ticketType,
          },
        ],
      }),
    )
  }
}
