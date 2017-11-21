import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';

import UserBadge from 'UserBadge';

const MIN_QUESTIONS = 4;

class QuizPreview extends Component {
  render() {
    if (!(this.props.topic && this.props.name && this.props.questions.length)) return null;

    return (
      <div className="publish-preview">
        <h5>{this.props.name || 'Untitled Quiz'}</h5>
        <UserBadge user={this.props.user} />
        <p>{this.props.questions.length} questions</p>
        <Button
          color="primary"
          disabled={this.props.questions.length < MIN_QUESTIONS}
          onClick={this.props.onPublish}>
          Publish
        </Button>
        {this.props.questions.length < MIN_QUESTIONS ? (
          <Alert className="margin-md" color="warning">
            Please add {MIN_QUESTIONS} questions to publish.
          </Alert>
        ) : (
          null
        )}
        {this.props.quizID ? (
          <Alert className="margin-md" color="success">
            Quiz published.{' '}
            <Link to={`/quiz/${this.props.quizID}`}>View Quiz</Link>
          </Alert>
        ) : (
          null
        )}
      </div>
    );
  }
}

export default QuizPreview;
