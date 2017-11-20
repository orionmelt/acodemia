import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: !props.newQuestion,
      id: props.id || 1,
      points: 10,
      questionText: (props.question && props.question.questionText) || '',
      correctAnswer: (props.question && props.question.correctAnswer) || '',
      wrongAnswer1: (props.question && props.question.wrongAnswer1) || '',
      wrongAnswer2: (props.question && props.question.wrongAnswer2) || '',
      wrongAnswer3: (props.question && props.question.wrongAnswer3) || ''
    };
    this.toggleViewMode = this.toggleViewMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  toggleViewMode() {
    this.setState({ viewMode: !this.state.viewMode });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSave(e) {
    e.preventDefault();
    if (!(
      this.state.questionText && this.state.correctAnswer && 
      this.state.wrongAnswer1 && this.state.wrongAnswer2 &&
      this.state.wrongAnswer3
    )) {
      //Error - form incomplete
      return;
    }
    let question = {
      id: this.state.id,
      points: this.state.points,
      questionText: this.state.questionText,
      correctAnswer: this.state.correctAnswer,
      wrongAnswer1: this.state.wrongAnswer1,
      wrongAnswer2: this.state.wrongAnswer2,
      wrongAnswer3: this.state.wrongAnswer3
    };
    this.props.onSaveQuestion(question);
    if (this.props.newQuestion) {
      this.setState({
        id: this.state.id + 1,
        points: 10,
        questionText: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        wrongAnswer3: ''
      });
    } else {
      this.toggleViewMode();
    }
  }

  onDelete(e) {
    e.preventDefault();
    this.props.onDeleteQuestion(this.state.id);
  }

  render() {
    return this.state.viewMode ? (
      <div className="question-preview">
        <h5>{this.props.question.questionText}</h5>
        <p className="text-success">{this.props.question.correctAnswer}</p>
        <p className="text-danger">{this.props.question.wrongAnswer1}</p>
        <p className="text-danger">{this.props.question.wrongAnswer2}</p>
        <p className="text-danger">{this.props.question.wrongAnswer3}</p>
        <Button color="primary" size="sm" onClick={this.toggleViewMode}>Edit</Button>{' '}
        <Button color="primary" size="sm" onClick={this.onDelete}>Delete</Button>
      </div>
    ) : (
      <Form>
        <FormGroup row>
          <Col xs="2">
            <Input
              type="number"
              step="10"
              min="10"
              max="100"
              value={this.state.points}
              onChange={this.onChange}
              name="points"
              id="points" />
          </Col>
          <Label xs="10">points (10-100)</Label>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={this.state.questionText}
            onChange={this.onChange}
            name="questionText"
            id="questionText"
            placeholder="Question" />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={this.state.correctAnswer}
            onChange={this.onChange}
            name="correctAnswer"
            id="correctAnswer"
            placeholder="Correct Answer" />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={this.state.wrongAnswer1}
            onChange={this.onChange}
            name="wrongAnswer1"
            id="wrongAnswer1"
            placeholder="Wrong Answer 1" />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={this.state.wrongAnswer2}
            onChange={this.onChange}
            name="wrongAnswer2"
            id="wrongAnswer2"
            placeholder="Wrong Answer 2" />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            value={this.state.wrongAnswer3}
            onChange={this.onChange}
            name="wrongAnswer3"
            id="wrongAnswer3"
            placeholder="Wrong Answer 3" />
        </FormGroup>
        <Button color="primary" size="sm" onClick={this.onSave}>
          {this.props.newQuestion ? 'Add Question' : 'Save'}
        </Button>
      </Form>
    );
  }
}

export default QuestionForm;
