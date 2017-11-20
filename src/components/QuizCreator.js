import React, { Component } from 'react';

import firebase, { quizzes, users } from 'backend';
import QuizForm from 'QuizForm';

class QuizCreator extends Component {
  constructor(props) {
    super(props);
    this.state = { quizID: null };
    this.publishQuiz = this.publishQuiz.bind(this);
  }

  publishQuiz(quiz) {
    quiz.author = this.props.user.uid;
    quiz.created = firebase.database.ServerValue.TIMESTAMP;
    var quizRef = quizzes.push(quiz);
    users.child(this.props.user.uid).child('authoredQuizzes').push({
      id: quizRef.key
    });
    users.child(this.props.user.uid).child('authoredQuizCount')
      .transaction((count) => count ? count + 1 : 1);
    this.setState({ quizID: quizRef.key });
  }

  render() {
    return [
      <h4 key="heading">Create Quiz</h4>,
      <QuizForm
        key="quizform"
        quizID={this.state.quizID}
        onPublish={this.publishQuiz}
        user={this.props.user} />
    ];
  }
}

export default QuizCreator;
