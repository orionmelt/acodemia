import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import firebase, { quizzes } from 'backend';
import QuizForm from 'QuizForm';

class QuizEditor extends Component {
  constructor(props) {
    super(props);
    this.quizID = props.match.params.quizID;
    this.state = { quiz: null };
    this.publishQuiz = this.publishQuiz.bind(this);
  }

  componentDidMount() {
    quizzes.child(this.quizID).on('value', (data) => {
      this.setState({ quiz: data.val() });
    });
  }

  componentWillUnmount() {
    quizzes.child(this.quizID).off('value');
  }

  publishQuiz(quiz) {
    quiz.updated = firebase.database.ServerValue.TIMESTAMP;
    quizzes.child(this.quizID).update(quiz);
    this.setState({ quizID: this.quizID });
  }

  render() {
    if (!this.state.quiz) return null;

    if (this.state.quiz.author !== this.props.user.uid) {
      return <Redirect to="/" />;
    }

    return [
      <h4 key="heading">Edit Quiz</h4>,
      <QuizForm
        key="quizform"
        quizID={this.state.quizID}
        quiz={this.state.quiz}
        onPublish={this.publishQuiz}
        user={this.props.user} />
    ];
  }
}

export default QuizEditor;
