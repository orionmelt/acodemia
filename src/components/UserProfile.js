import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { quizzes } from 'backend';
import UserSummary from 'UserSummary';
import QuizList from 'QuizList';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      loading: true
    };
  }

  componentDidMount() {
    quizzes.orderByChild('author').equalTo(this.props.user.uid).on('value', (data) => {
      var quizzes = [];
      data.forEach((child) => {
        var quiz = child.val();
        quiz['.key'] = child.key;
        quizzes.push(quiz);
      });
      this.setState({
        quizzes: quizzes,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    quizzes.off('value');
  }

  render() {
    if (this.state.loading) return null;
    
    return (
      <Row>
        <Col lg="3" xs="12">
          <UserSummary user={this.props.user} />
        </Col>
        <Col lg="9" xs="12">
          <h4 className="margin-btm-lg">My Quizzes</h4>
          <QuizList editable quizzes={this.state.quizzes} />
        </Col>
      </Row>
    );
  }
}

export default UserProfile;
