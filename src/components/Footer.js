import React, { Component } from 'react';
import { Container } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <footer>
        <Container className="text-right">
          <ul className="list-inline">
            <li className="list-inline-item">&copy; Acodemia {(new Date()).getFullYear()}</li>
            <li className="list-inline-item">Fork me on GitHub</li>
          </ul>
        </Container>
      </footer>
    );
  }
}

export default Footer;
