import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import Answer from 'Answer';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      answers: this.shuffleAnswers(props)
    };
    this.onAnswer = this.onAnswer.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.index === nextProps.index) return;
    this.setState({
      answers: this.shuffleAnswers(nextProps),
      answered: false
    });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleAnswers(props) {
    let answers = props.question.answers.map((answer, i) => ({
      id: i,
      content: answer,
      className: 'answer'
    }));
    this.shuffle(answers);
    return answers;
  }

  onAnswer(answerID) {
    if (this.state.answered) return;
    this.props.onAnswer(this.props.index, answerID);
    let answers = this.state.answers.map((answer) => {
      if(answer.id === answerID) {
        answer.className += (answerID===0) ? ' correct' : ' wrong'; 
      }
      return answer;
    });
    this.setState({
      answered: true,
      answers: answers
    });
  }

  render() {
    return [
      <h6 key="index" className="text-muted margin-md">
        Question #{this.props.index + 1} of {this.props.total} ({this.props.question.points} points)
      </h6>,
      <h3 key="question" className="margin-lg">{this.props.question.questionText}</h3>,
      <Row key="answers">
        {this.state.answers.map((answer, i) => {
          return (
            <Col lg="6" xs="12" key={i}>
              <Answer answer={answer} onAnswer={this.onAnswer} />
            </Col>
          );
        })}
      </Row>
    ];
  }
}

export default Question;
