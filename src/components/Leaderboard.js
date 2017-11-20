import React, { Component } from 'react';
import { Table } from 'reactstrap';

import { leaderboards } from 'backend';
import UserBadge from 'UserBadge';
import Timer from 'Timer';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: null
    };
  }

  componentDidMount() {
    leaderboards.child(this.props.quizID).on('value', (data) => {
      let leaderboard = [];
      data.forEach((entry) => {
        leaderboard.push({
          user: {
            uid: entry.key,
            displayName: entry.val().displayName,
            photoURL: entry.val().photoURL
          },
          time: entry.val().time,
          score: entry.val().score
        });
      });
      this.setState({
        leaderboard: leaderboard
      });
    });
  }

  componentWillUnmount() {
    leaderboards.child(this.props.quizID).off('value');
  }

  render() {
    if (!this.state.leaderboard) return null;
    
    return this.state.leaderboard.length ? (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th className="text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {this.state.leaderboard.map((entry) => {
            return (
              <tr key={entry.user.uid}>
                <td>
                  <UserBadge user={entry.user} />
                </td>
                <td><Timer seconds={entry.time} /></td>
                <td className="text-right">{entry.score}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    ) : (
      <div className="padded-md text-muted text-center">
        Be the first to take this quiz.
      </div>
    );
  }
}

export default Leaderboard;
