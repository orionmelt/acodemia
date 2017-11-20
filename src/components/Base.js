import React, { Component } from 'react';
import { Container } from 'reactstrap';

import { auth, users } from 'backend';
import PrivateRoute from 'PrivateRoute';
import Menubar from 'Menubar';
import Footer from 'Footer';
import Login from 'Login';
import Home from 'Home';
import Quiz from 'Quiz';
import QuizCreator from 'QuizCreator';
import QuizEditor from 'QuizEditor';
import UserProfile from 'UserProfile';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.removeAuthListener = auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({ loading: false });
        return;
      }
      user = {
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName.split(' ')[0]
      };
      users.child(user.uid).update(user);
      this.setState({
        user: user
      });
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  login(provider) {
    auth.signInWithPopup(provider);
  }

  logout(e) {
    e.preventDefault();
    auth.signOut().then(() => {
      this.setState({ user: null });
    });
  }

  render() {
    if (this.state.loading) return null;

    return [
        <Menubar key="menubar" user={this.state.user} onLogout={this.logout} />,
        <main key="main">
        {
          this.state.user ? (
            <Container className="main-container">
              <PrivateRoute
                user={this.state.user}
                path="/" exact
                component={Home} />
              <PrivateRoute
                user={this.state.user}
                path="/quiz/:quizID"
                component={Quiz} />
              <PrivateRoute
                user={this.state.user}
                path="/create-quiz"
                component={QuizCreator} />
              <PrivateRoute
                user={this.state.user}
                path="/edit-quiz/:quizID"
                component={QuizEditor} />
              <PrivateRoute
                user={this.state.user}
                path="/me"
                component={UserProfile} />
            </Container>
          ) : (
            <Login onLogin={this.login} />
          )
        }
        </main>,
        <Footer key="footer" />
    ];
  }
}

export default Base;
