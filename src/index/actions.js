import { lsSave, lsReadObj } from '../utils/ls'
export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE =
  'SET_IS_CITY_SELECTOR_VISIBLE'
export const ACTION_SET_CURRENTY_SELECTING_LEFT_CITY =
  'SET_CURRENTY_SELECTING_LEFT_CITY'
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA'
export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA'
export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE =
  'SET_IS_DATE_SELECTOR_VISIBLE'
export const ACTION_SET_HIGHSPEED = 'SET_HIGHSPEED'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'
export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  }
}
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  }
}
export function setIsLoadingCityData(loadingCityData) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: loadingCityData,
  }
}
export function setCityData(cityData) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData,
  }
}
export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGHSPEED,
      payload: !highSpeed,
    })
  }
}

export function showCitySelector(currentSelectingLeftCity) {
  return dispatch => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    })
    dispatch({
      type: ACTION_SET_CURRENTY_SELECTING_LEFT_CITY,
      payload: currentSelectingLeftCity,
    })
  }
}
export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  }
}

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  }
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState()
    console.log(currentSelectingLeftCity)
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city))
    } else {
      dispatch(setTo(city))
    }
    dispatch(hideCitySelector())
  }
}
export function showDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: true,
  }
}
export function hideDateSelector() {
  return {
    type: ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload: false,
  }
}
export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState()
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}
export function fetchCityData() {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState()
    if (!isLoadingCityData) {
      const cache = lsReadObj('city_data_cache')
      if (cache) {
        const { expires, data } = cache
        if (Date.now() < expires) {
          dispatch(setCityData(data))
          return
        }
      }
      dispatch(setIsLoadingCityData(true))
      fetch('/rest/cities?_' + Date.now())
        .then(res => res.json())
        .then(cityData => {
          dispatch(setCityData(cityData))
          lsSave('city_data_cache', {
            exires: Date.now() + 60 * 1000,
            data: cityData,
          })
          dispatch(setIsLoadingCityData(false))
        })
        .catch(() => {
          dispatch(setIsLoadingCityData(false))
        })
    }
  }
}
