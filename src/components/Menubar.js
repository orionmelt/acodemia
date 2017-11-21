import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  Container
} from 'reactstrap';

class Menubar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <header>
        <Container>
          <Navbar color="dark" className="navbar-dark" expand="md">
            <NavbarBrand tag={Link} to="/">
              <img src="/favicon.png" alt="Acodemia Logo" width="30" class="logo" />
              ACODEMIA
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {this.props.user ? (
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to='/'>Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/create-quiz'>Create Quiz</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to='/me'>Profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/logout" onClick={this.props.onLogout}>Logout</NavLink>
                  </NavItem>
                </Nav>
              ) : (
                null
              )}
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

export default Menubar;
