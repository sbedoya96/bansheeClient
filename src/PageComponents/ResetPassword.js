import React, { Component } from "react";
import Octicon, { Eye, EyeClosed, Bold } from "@primer/octicons-react";
import PropTypes from "prop-types";
import { Container, Row, Form, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { Pbutton } from "../Components/Pbutton";
import pizza from "../assets/images/pizza.png";
import { ResetPassAction } from "../Redux/actions/ResetPasswordActions";
import { withRouter } from "react-router-dom";
import Slide from "react-reveal/Slide";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resPass: "",
      verPass: "",
      newPass: "",
      error: "",
      type: "password",
      submitForm: false
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("ptk")) {
      this.props.history.push("/");
    } else {
      MySwal.fire({
        type: "info",
        showCloseButton: true,
        html:
          '<p style="font-weight:bold;">Para en el cambio de contraseña tener en cuenta:</p> ' +
          '</br> <ul style="text-align:left;"> <li>La contraseña debe tener ocho caracteres o más.</li><li>La contraseña debe contener al menos 1 carácter alfabético en minúsculas.<li>La contraseña debe contener al menos 1 carácter alfabético en mayúsculas.</li><li>La contraseña debe contener al menos 1 carácter numérico.</li> <li>La contraseña debe contener al menos un carácter especial.</li></ul>',
        showConfirmButton: false
      });
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
      resPass: this.state.resPass,
      verPass: this.state.verPass,
      newPass: this.state.newPass
    };
    const { resPass, verPass, newPass } = dataLogin;
    if (!resPass || !verPass || !newPass) {
      this.setState({ error: "Debes llenar todos los campos" });
    } else if (verPass != newPass) {
      this.setState({ error: "Las contraseñas ingresadas no coinciden" });
    } else {
      this.props.ResetPassAction(resPass, newPass).then(res => {
        console.log(res);
        if (res === 200) {
          MySwal.fire({
            type: "success",
            title: "Cambio de contraseña exitoso",
            showConfirmButton: false,
            timer: 1500
          });
          this.props.history.push("/profile");
        } else {
          this.setState({
            error:
              "Ha ocurrido un error, valida tus campos e intenta nuevamente"
          });
        }
      });
    }
  };

  render() {
    return (
      <Container className="Form-login">
        <Row className="d-flex align-items-center">
          <Col md={8} className="Form-Login-Img-Container">
            <Image src={pizza} alt="pizza" fluid />
          </Col>
          <Col md={4}>
            <Slide top duration={2000}>
              <h1>
                CAMBIAR <span>CONTRASEÑA</span>
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
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type={this.state.type}
                    placeholder="Digite su contraseña"
                    onChange={e => this.change(e)}
                    value={this.state.resPass}
                    name="resPass"
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
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type={this.state.type}
                    placeholder="Digite NUEVA contraseña"
                    onChange={e => this.change(e)}
                    value={this.state.verPass}
                    name="verPass"
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
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type={this.state.type}
                    placeholder="Verifique NUEVA contraseña"
                    onChange={e => this.change(e)}
                    value={this.state.newPass}
                    name="newPass"
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
                  contenido="RESTAURAR"
                />
              </Slide>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

ResetPassword.propTypes = {
  ResetPassAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { ResetPassAction }
)(withRouter(ResetPassword));
