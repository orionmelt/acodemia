import React, { Component } from 'react';

class Answer extends Component {
  constructor(props) {
    super(props);
    this.onAnswer = this.onAnswer.bind(this);
  }

  onAnswer(e) {
    this.props.onAnswer(this.props.answer.id);
  }

  render() {
    return (
      <div className={this.props.answer.className} onClick={this.onAnswer}>
        {this.props.answer.content}
      </div>
    );
  }
}

export default Answer;
