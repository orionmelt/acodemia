import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import 'Login.css';

import { google, facebook, github } from 'backend';


class Login extends Component {
  constructor(props) {
    super(props);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.loginWithGithub = this.loginWithGithub.bind(this);
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
    return (
      <div>
      <div className="intro">
        <Container className="main-container">
          <Row>
            <Col md="6" xs="12">
              <h1 className="display-4">Answer me this.</h1>
              <p>
                Evaluate and improve your skills by taking quizzes 
                created by developers just like you.
              </p>
            </Col>
            <Col md="2">
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
            <h4>Create your own quiz</h4>
            <p>
              Are you a Python expert? JavaScript mastermind? Help other developers 
              test their skills in technologies you know and love.
            </p>
            <p>
              Create a quiz. It'll be your good deed for today.
            </p>
          </Col>
          <Col>
            <h4>Take a quiz</h4>
            <p>
              Not feeling creative? That's okay.
            </p>
            <p>
              Take a quiz created by your fellow developers. Answer most questions 
              correctly in the shortest amount of time to climb the leaderboards.
            </p>
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

export default Login;
