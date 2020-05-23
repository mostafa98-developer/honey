import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    console.log('mostafa');
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    console.log('almoamni');
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2 style={{color: "#3f51b5"}}>{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;