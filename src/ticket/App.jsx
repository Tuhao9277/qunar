import React from 'react';
import { connect } from 'react-redux';
import Detail from './../components/Detail'
import Candidate from  './../components/Candidate'
import Schedule from  './../components/Schedule'
import './App.css';

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,
    dispatch,
  } = props;
  return <span>App</span>;
}

export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {return dispatch},
)(App);
