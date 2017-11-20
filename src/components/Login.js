import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import 'Login.css';

import { quizzes, google, facebook, github } from 'backend';
import QuizList from 'QuizList';


class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGithub = this.loginWithGithub.bind(this);
    this.state = {
      quizzes: [],
      loading: true
    };
  }

  componentDidMount() {
    quizzes.limitToLast(5).on('value', (data) => {
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

  loginWithGoogle() {
    this.props.onLogin(google);
  }

  loginWithFacebook() {
    this.props.onLogin(facebook);
  }

  loginWithGithub() {
    this.props.onLogin(github);
  }

  render() {
    if (this.state.loading) return null;

    return (
      <div>
      <div className="intro">
        <Container className="main-container">
          <Row>
            <Col md="8" xs="12">
              <h1 className="display-4">Tagline here.</h1>
              <img src="http://via.placeholder.com/400x200" alt="Placeholder" />
            </Col>
            <Col md="4" xs="12">
              <div className="login">
                <h4 className="margin-md">Sign in with</h4>
                <Button
                  className="facebook margin-sm"
                  onClick={this.loginWithFacebook}>
                  Facebook
                </Button>
                <br />
                <Button className="google margin-sm" onClick={this.loginWithGoogle}>Google</Button>
                <br />
                <Button className="github margin-sm" onClick={this.loginWithGithub}>GitHub</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col>
            <h4>Create your own quizzes</h4>
            <p>Help other developers test their skills.</p>
          </Col>
          <Col>
            <h4>Latest quizzes</h4>
            <QuizList quizzes={this.state.quizzes} />
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Login;
