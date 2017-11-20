import React, { Component } from 'react';

import 'UserBadge.css';

class UserBadge extends Component {
  render() {
    return (
      <div className="user-badge">
        <img src={this.props.user.photoURL} alt={this.props.user.displayName} />
        {this.props.user.displayName}
      </div>
    );
  }
}

export default UserBadge;
