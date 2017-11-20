import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import 'QuizCard.css';

import topics from 'topics';
import { users } from 'backend';
import UserBadge from 'UserBadge';

class QuizCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: null,
      loading: true,
      topic: topics.find((topic) => topic.id === props.quiz.topic)
    };
  }

  componentDidMount() {
    users.child(this.props.quiz.author).on('value', (data) => {
      this.setState({
        author: data.val(),
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) return null;

    return (
      <div className="quiz-card">
        <div className={'topic ' + this.state.topic.id}>
          {this.state.topic.name}
        </div>
        <div className="count text-xs text-uppercase">
          <div>Taken</div>
          <span className="value">{this.props.quiz.takenCount || 0}</span>
          <div>Times</div>
        </div>
        <div className="content">
          <Link to={`/quiz/${this.props.quiz['.key']}`}>
            <h5>{this.props.quiz.name}</h5>
          </Link>
          <UserBadge user={this.state.author} />
          <ul className="list-inline no-margin text-sm">
            <li className="list-inline-item">
              Created <TimeAgo date={this.props.quiz.created} />
            </li>
            {this.props.editable ? (
              <li className="list-inline-item">
                <Link to={`/edit-quiz/${this.props.quiz['.key']}`}>Edit</Link>
              </li>
            ) : (
              null
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizCard;
