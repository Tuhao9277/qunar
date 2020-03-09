import {
  ACTION_SET_DEPARTDATE,
  ACTION_SET_ARRIVEDATE,
  ACTION_SET_DEPARTTIMESTR,
  ACTION_SET_ARRIVETIMESTR,
  ACTION_SET_DEPARTSTATION,
  ACTION_SET_ARRIVESTATION,
  ACTION_SET_DURATIONSTR,
  ACTION_SET_TICKETS,
  ACTION_SET_ISSCHEDULEVISIBLE,
  ACTION_SET_SEARCHPARSED,
} from './actions';
export default {
  departDate(state = Date.now(), { type, payload }) {
    switch (type) {
      case ACTION_SET_DEPARTDATE: {
        return payload;
      }
      default:
    }
    return state;
  },
  arriveDate(state = Date.now(), { type, payload }) {
    switch (type) {
      case ACTION_SET_ARRIVEDATE: {
        return payload;
      }
      default:
    }
    return state;
  },
  departTimeStr(state = null, { type, payload }) {
    switch (type) {
      case ACTION_SET_DEPARTTIMESTR: {
        return payload;
      }
      default:
    }
    return state;
  },
  arriveTimeStr(state = null, { type, payload }) {
    switch (type) {
      case ACTION_SET_ARRIVETIMESTR: {
        return payload;
      }
      default:
    }
    return state;
  },
  departStation(state = null, { type, payload }) {
    switch (type) {
      case ACTION_SET_DEPARTSTATION: {
        return payload;
      }
      default:
    }
    return state;
  },
  arriveStation(state = null, { type, payload }) {
    switch (type) {
      case ACTION_SET_ARRIVESTATION: {
        return payload;
      }
      default:
    }
    return state;
  },
  durationStr(state = null, { type, payload }) {
    switch (type) {
      case ACTION_SET_DURATIONSTR: {
        return payload;
      }
      default:
    }
    return state;
  },
  tickets(state = [], { type, payload }) {
    switch (type) {
      case ACTION_SET_TICKETS: {
        return payload;
      }
      default:
    }
    return state;
  },
  isScheduleVisible(state = false, { type, payload }) {
    switch (type) {
      case ACTION_SET_ISSCHEDULEVISIBLE: {
        return payload;
      }
      default:
    }
    return state;
  },
  searchParsed(state = false, { type, payload }) {
    switch (type) {
      case ACTION_SET_SEARCHPARSED: {
        return payload;
      }
      default:
    }
    return state;
  },
};
