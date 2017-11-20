import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import 'QuizList.css';

import QuizCard from 'QuizCard';

class QuizList extends Component {
  render() {
    return this.props.quizzes.length ? (
      this.props.quizzes.map((quiz) => {
        return (
          <Row key={quiz['.key']}>
            <Col>
              <QuizCard editable={this.props.editable} quiz={quiz} />
            </Col>
          </Row>
        );
      })
    ) : (
      <div className="placeholder">
        <p>No quizzes available.</p>
        <p><Link to="/create-quiz">Create a quiz now.</Link></p>
      </div>
    );
  }
}

export default QuizList;
