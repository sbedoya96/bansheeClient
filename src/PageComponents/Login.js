import React, { Component } from "react";
import Octicon, { Eye, EyeClosed } from "@primer/octicons-react";
import PropTypes from "prop-types";
import { Container, Row, Form, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { Pbutton } from "../Components/Pbutton";
import pizza from "../assets/images/pizza.png";
import { LoginAction } from "../Redux/actions/LoginActions";
import store from "../Redux/store";
import { withRouter } from "react-router-dom";
import Slide from "react-reveal/Slide";
import base64url from "base64url";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      type: "password",
      error: ""
    };
  }
  componentDidMount() {
    if (localStorage.getItem("ptk")) {
      this.props.history.push("/profile");
    }
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  showHide = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  };

  submit = e => {
    e.preventDefault();
    const dataLogin = {
      user: this.state.user,
      pass: this.state.pass
    };
    this.props.LoginAction(dataLogin).then(res => {
      console.log(res);
      if (res === 1) {
        localStorage.setItem("ptk", store.getState().Login.token);
        localStorage.setItem("prtk", store.getState().Login.refresh);
        let token = localStorage.getItem("ptk");
        let payload = JSON.parse(base64url.decode(token.split(".")[1]));
        if (payload.scope.includes("require:chgpass")) {
          this.props.history.push("/resetpassword");
        } else {
          this.props.history.push("/profile");
        }
      } else {
        this.setState({ error: store.getState().Login.error });
      }
    });
  };

  render() {
    return (
      <Container className="Form-login">
        <Row className="d-flex align-items-center">
          <Col md={8} className="Form-Login-Img-Container">
            <Image
              src="https://source.unsplash.com/1600x900/?Cycle,bicycle"
              alt="bike"
              fluid
            />
          </Col>
          <Col md={4}>
            <Slide top duration={2000}>
              <h1>
                SIGN <span>IN</span>
              </h1>
            </Slide>
            {this.state.error ? (
              <div className="alert alert-danger" role="alert">
                {" "}
                {this.state.error}
              </div>
            ) : (
              ""
            )}
            <Form onSubmit={e => this.submit(e)}>
              <Slide right duration={2000}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="USER"
                    onChange={e => this.change(e)}
                    name="user"
                    value={this.state.user}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type={this.state.type}
                    placeholder="PASSWORD"
                    onChange={e => this.change(e)}
                    value={this.state.pass}
                    name="pass"
                  />
                  <span
                    className="password__show"
                    onClick={e => this.showHide(e)}
                  >
                    {this.state.type === "input" ? (
                      <Octicon icon={EyeClosed} />
                    ) : (
                      <Octicon icon={Eye} />
                    )}
                  </span>
                </Form.Group>
              </Slide>
              <Slide bottom duration={2000}>
                <Pbutton
                  className="Form-login-btn"
                  type="submit"
                  contenido="SIGN IN"
                />
              </Slide>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  LoginAction: PropTypes.func.isRequired
};

export default connect(null, { LoginAction })(withRouter(Login));
