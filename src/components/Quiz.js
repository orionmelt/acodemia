import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import 'Quiz.css';

import topics from 'topics';
import { quizzes, users, leaderboards } from 'backend';
import UserBadge from 'UserBadge';
import Question from 'Question';
import Leaderboard from 'Leaderboard';
import Timer from 'Timer';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.quizID = props.match.params.quizID;
    this.state = {
      quiz: {},
      author: {},
      topic: null,
      loading: true,
      state: 'init',
      currQuestionIndex: 0,
      score: 0,
      secondsElapsed: 0
    };
    this.start = this.start.bind(this);
    this.processAnswer = this.processAnswer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    quizzes.child(this.quizID).on('value', (data) => {
      let quizRecord = data.val();
      quizRecord.id = data.key;
      quizRecord.questions = quizRecord.questions.map((question) => ({
        id: question.id,
        points: question.points,
        questionText: question.questionText,
        answers: [
          question.correctAnswer,
          question.wrongAnswer1,
          question.wrongAnswer2,
          question.wrongAnswer3
        ]
      }));
      users.child(quizRecord.author).on('value', (data) => {
        let topic = topics.find((topic) => topic.id === quizRecord.topic);
        this.setState({
          quiz: quizRecord,
          author: data.val(),
          topic: topic,
          loading: false
        });
      });
    });
  }

  componentWillUnmount() {
    quizzes.child(this.quizID).off('value');
    clearInterval(this.intervalId);
  }

  start(e) {
    this.setState({ state: 'started' });
    this.intervalId = setInterval(this.tick.bind(this), 1000);
  }

  processAnswer(questionIndex, answerID) {
    var answerScore = (answerID === 0) ? this.state.quiz.questions[questionIndex].points : 0;
    this.setState({ score: this.state.score + answerScore });
  }

  nextQuestion() {
    if (this.state.currQuestionIndex < this.state.quiz.questions.length - 1) {
      this.setState({ currQuestionIndex: this.state.currQuestionIndex + 1 });
    } else {
      this.setState({ state: 'ended' });
      let priority = this.state.score + (1 / this.state.secondsElapsed);
      leaderboards.child(this.state.quiz.id).child(this.props.user.uid).setWithPriority(
        {
          displayName: this.props.user.displayName,
          photoURL: this.props.user.photoURL,
          time: this.state.secondsElapsed,
          score: this.state.score
        },
        -priority
      );
      quizzes.child(this.state.quiz.id).child('takenCount')
        .transaction((takenCount) => takenCount + 1);
      users.child(this.props.user.uid).child('takenQuizzes').update({
        [this.state.quiz.id]: 1
      });
    }
  }

  tick() {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  }

  render() {
    if (this.state.loading) return null;

    return (
      <Row>
        <Col lg="9" xs="12">
          <div className="quiz">
            {{
              'init': (
                <div className="intro">
                  <h3>{this.state.quiz.name}</h3>
                  <div className={'topic-tag ' + this.state.topic.id}>{this.state.topic.name}</div>
                  <div className="margin-lg">
                    <UserBadge user={this.state.author} />
                  </div>
                  <Button color="primary" onClick={this.start}>
                    Start Quiz
                  </Button>
                </div>
              ),
              'started': (
                <div>
                  <Row>
                    <Col sm="6" xs="12">
                      <h5>
                        {this.state.quiz.name}{' '}
                        <div className={'topic-tag ' + this.state.topic.id}>
                          {this.state.topic.name}
                        </div>
                      </h5>
                    </Col>
                    <Col sm="3" xs="6">
                      <h5><span className="text-muted">Score</span> {this.state.score}</h5>
                    </Col>
                    <Col sm="3" xs="6">
                      <h5>
                        <span className="text-muted">Time</span>{' '}
                        <Timer seconds={this.state.secondsElapsed} />
                      </h5>
                    </Col>
                  </Row>
                  <Question
                    index={this.state.currQuestionIndex}
                    total={this.state.quiz.questions.length}
                    onAnswer={this.processAnswer}
                    question={this.state.quiz.questions[this.state.currQuestionIndex]} />
                  <Button color="primary" onClick={this.nextQuestion}>
                    {this.state.currQuestionIndex < this.state.quiz.questions.length - 1 ? (
                      'Next Question'
                    ) : (
                      'Finish Quiz'
                    )}
                  </Button>
                </div>
              ),
              'ended': (
                <div className="intro">
                  <h4>{this.state.quiz.name}</h4>
                  <div className="topic-tag">{this.state.topic.name}</div>
                  <h2 className="margin-lg">
                    {this.state.score ? 'Well done!' : 'Better luck next time.'}
                  </h2>
                  <p>Your score is {this.state.score}</p>
                </div>
              )
            }[this.state.state]}
          </div>
        </Col>
        <Col lg="3" xs="12">
          <h5 className="text-center">Leaderboard</h5>
          <Leaderboard quizID={this.quizID} />
        </Col>
      </Row>
    );
  }
}

export default Quiz;
