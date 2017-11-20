import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import 'QuizForm.css';

import TopicSelect from 'TopicSelect';
import TopicNameInput from 'TopicNameInput';
import QuestionForm from 'QuestionForm';
import QuizPreview from 'QuizPreview';

class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: (props.quiz && props.quiz.topic) || '',
      questions: (props.quiz && props.quiz.questions) || [],
      name: (props.quiz && props.quiz.name) || ''
    };
    this.onChange = this.onChange.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onSaveQuestion = this.onSaveQuestion.bind(this);
    this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSaveQuestion(question) {
    let i = this.state.questions.findIndex((q) => q.id === question.id);
    if (i !== -1) {
      let questions = this.state.questions;
      questions[i] = question;
      this.setState({ questions: questions });
    } else {
      this.setState({ questions: this.state.questions.concat(question) });
    }
  }

  onDeleteQuestion(questionID) {
    let i = this.state.questions.findIndex((q) => q.id === questionID);
    let questions = this.state.questions;
    questions.splice(i, 1);
    this.setState({
      questions: questions || []
    });
  }

  onPublish(e) {
    this.props.onPublish(this.state);
  }

  render() {
    return (
      <Row>
        <Col lg="8" xs="12">
          <div className="quiz-form">
            <TopicSelect topic={this.state.topic} onChange={this.onChange} />
            <TopicNameInput
              topic={this.state.topic}
              name={this.state.name}
              onChange={this.onChange} />
            {this.state.name ? (
              <div className="question-item">
                <h6>Question {this.state.questions.length+1}</h6>
                <QuestionForm
                  newQuestion
                  id={this.state.questions.length+1}
                  onSaveQuestion={this.onSaveQuestion} />
              </div>
            ) : (
              null
            )}
          </div>
          {this.state.questions.length ? <hr /> : null}
          {this.state.questions.map((question, i) => {
            return (
              <div className="question-item" key={i}>
                <h6 className="text-muted">Question {i+1}</h6>
                <QuestionForm
                  id={question.id}
                  question={question}
                  onSaveQuestion={this.onSaveQuestion} 
                  onDeleteQuestion={this.onDeleteQuestion} />
              </div>
            );
          })}
        </Col>
        <Col lg="4" xs="12">
          <QuizPreview
            user={this.props.user}
            topic={this.state.topic}
            name={this.state.name}
            questions={this.state.questions}
            quizID={this.props.quizID}
            onPublish={this.onPublish} />
        </Col>
      </Row>
    );
  }
}

export default QuizForm;
