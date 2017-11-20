import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';

import topics from 'topics';

class TopicSelect extends Component {
  render() {
    return (
      <FormGroup>
        <Input
          type="select"
          name="topic"
          id="topic"
          value={this.props.topic}
          onChange={this.props.onChange}>
          <option value="">Select Topic</option>
          {topics.map((topic) => {
            return (
              <option
                key={topic.id}
                value={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
    );
  }
}

export default TopicSelect;
