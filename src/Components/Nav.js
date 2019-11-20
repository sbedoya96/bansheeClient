import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Image,
  Breadcrumb,
  Form
} from "react-bootstrap";
import logo from "./../assets/images/logo-blanco.svg";
import alarma from "./../assets/images/alarma.svg";
import { LogoutAction } from "../Redux/actions/LogoutActions";
import { withRouter } from "react-router-dom";

const params = {
  notificacion: Math.floor(Math.random() * 30 + 1)
};

class Navigation extends Component {
  click = e => {
    e.preventDefault();
    this.props.LogoutAction();
    this.props.history.push("/");
  };
  render() {
    return (
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <Image alt="logo" src={logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Breadcrumb>
                {/* <Breadcrumb.Item href="#">Inicio</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Pique</Breadcrumb.Item> */}
              </Breadcrumb>
            </Nav>
            <Form inline>
              {/* <NavDropdown
                title={
                  <React.Fragment>
                    <img src={alarma} alt="alarma" />
                    <span>{params.notificacion}</span>
                  </React.Fragment>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link onClick={e => this.click(e)}>CERRAR SESIÓN</Nav.Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  LogoutAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { LogoutAction }
)(withRouter(Navigation));
