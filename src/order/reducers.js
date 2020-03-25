import {
ACTION_SET_TRAINNUMBER,
ACTION_SET_DEPARTSTATION,
ACTION_SET_ARRIVESTATION,
ACTION_SET_SEATTYPE,
ACTION_SET_DEPARTDATE,
ACTION_SET_ARRIVEDATE,
ACTION_SET_DEPARTTIMESTR,
ACTION_SET_ARRIVETIMESTR,
ACTION_SET_DURATIONSTR,
ACTION_SET_PRICE,
ACTION_SET_PASSENGERS,
ACTION_SET_MENU,
ACTION_SET_ISMENUVISIBLE,
ACTION_SET_SEARCHPARSED,
} from './action'
export default {
  trainNumber(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_TRAINNUMBER:
        return payload
      default:
    }
    return state
  },
  departStation(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_DEPARTSTATION:
        return payload
      default:
    }
    return state
  },
  arriveStation(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_ARRIVESTATION:
        return payload
      default:
    }
    return state
  },
  seatType(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_SEATTYPE:
        return payload
      default:
    }
    return state
  },
  departDate(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_DEPARTDATE:
        return payload
      default:
    }
    return state
  },
  arriveDate(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_ARRIVEDATE:
        return payload
      default:
    }
    return state
  },
  departTimeStr(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_DEPARTTIMESTR:
        return payload
      default:
    }
    return state
  },
  arriveTimeStr(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_ARRIVETIMESTR:
        return payload
      default:
    }
    return state
  },
  durationStr(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_DURATIONSTR:
        return payload
      default:
    }
    return state
  },
  price(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_PRICE:
        return payload
      default:
    }
    return state
  },
  passengers(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_PASSENGERS:
        return payload
      default:
    }
    return state
  },
  menu(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_MENU:
        return payload
      default:
    }
    return state
  },
  isMenuVisible(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_ISMENUVISIBLE:
        return payload
      default:
    }
    return state
  },
  searchParsed(state= null ,action){
    const {payload,type} = action
    switch(type){
      case ACTION_SET_SEARCHPARSED:
        return payload
      default:
    }
    return state
  },
}
