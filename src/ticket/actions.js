import { h0 } from './../components/fp'
export const ACTION_SET_DEPARTDATE = 'SET_DEPARTDATE'
export const ACTION_SET_ARRIVEDATE = 'SET_ARRIVEDATE'
export const ACTION_SET_DEPARTTIMESTR = 'SET_DEPARTTIMESTR'
export const ACTION_SET_ARRIVETIMESTR = 'SET_ARRIVETIMESTR'
export const ACTION_SET_DEPARTSTATION = 'SET_DEPARTSTATION'
export const ACTION_SET_ARRIVESTATION = 'SET_ARRIVESTATION'
export const ACTION_SET_DURATIONSTR = 'SET_DURATIONSTR'
export const ACTION_SET_TICKETS = 'SET_TICKETS'
export const ACTION_SET_ISSCHEDULEVISIBLE = 'SET_ISSCHEDULEVISIBLE'
export const ACTION_SET_SEARCHPARSED = 'SET_SEARCHPARSED'
export const ACTION_SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER'
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPARTDATE,
    payload: departDate,
  }
}
export function setTrainNumber(trainNumber) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber,
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
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATIONSTR,
    payload: durationStr,
  }
}
export function setTickets(tickets) {
  return {
    type: ACTION_SET_TICKETS,
    payload: tickets,
  }
}
export function setIsScheduleVisible(isScheduleVisible) {
  return {
    type: ACTION_SET_ISSCHEDULEVISIBLE,
    payload: isScheduleVisible,
  }
}
export function toggleIsScheduleVisible() {
  return (dispatch, getState) => {
    const { isScheduleVisible } = getState()
    dispatch(setIsScheduleVisible(!isScheduleVisible))
  }
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCHPARSED,
    payload: searchParsed,
  }
}
export function nextDate() {
  return (dispatch, getState) => {
    const { departDate } = getState()
    dispatch(setDepartDate(h0(departDate) + 86400 * 1000))
  }
}
export function prevDate() {
  return (dispatch, getState) => {
    const { departDate } = getState()
    dispatch(setDepartDate(h0(departDate) - 86400 * 1000))
  }
}
