import React, { Component } from 'react';

class Timer extends Component {
  render() {
    let minutes = Math.floor(this.props.seconds / 60);
    let seconds = this.props.seconds - minutes * 60;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    return (
      <span>{minutes} : {seconds}</span>
    );
  }
}

export default Timer;
