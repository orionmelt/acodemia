import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';

class TopicNameInput extends Component {
  render() {
    if (!this.props.topic) return null;
    
    return (
      <FormGroup>
        <Input
          type="text"
          name="name"
          id="name"
          value={this.props.name}
          onChange={this.props.onChange}
          placeholder="Quiz name (for example, Beginner's Python)" />
      </FormGroup>
    );
  }
}

export default TopicNameInput;
