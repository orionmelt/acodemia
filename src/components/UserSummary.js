import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'UserSummary.css';

import { users } from 'backend';

class UserSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    users.child(this.props.user.uid).on('value', (data) => {
      this.setState({
        user: data.val(),
        loading: false
      });
    });
  }

  componentWillUnmount() {
    users.child(this.props.user.uid).off('value');
  }

  render() {
    if (this.state.loading) return null;

    return (
      <div className="user-profile">
        <Link to="/me">
          <div className="header">
            <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
            <h4>{this.state.user.displayName}</h4>
          </div>
        </Link>
        <div className="body">
          <div className="count-badge">
            <h5>{this.state.user.authoredQuizCount || 0}</h5>
            <p>authored</p>
          </div>
          <div className="count-badge">
            <h5>{Object.keys(this.state.user.takenQuizzes || []).length}</h5>
            <p>taken</p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSummary;
