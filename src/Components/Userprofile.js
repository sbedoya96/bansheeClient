import React, { Component } from "react";
import { Col, Image } from "react-bootstrap";
import foto from "./../assets/images/foto.png";
import base64url from "base64url";
import estrella1 from "./../assets/images/star1.png";
import estrella2 from "./../assets/images/star2.png";
import store from "../Redux/store";
import { withRouter } from "react-router-dom";

class Userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      position: ""
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("ptk");
    if (token) {
      let payload = JSON.parse(base64url.decode(token.split(".")[1]));
      this.setState({
        name: payload.name,
        position: payload.position
      });
    } else {
      this.props.history.push("/");
    }
  }
  render() {
    return (
      <React.Fragment>
        <Col className="profile-img" xs={6} md={3}>
          <Image src={"/foto.png"} roundedCircle />
        </Col>
        <Col md={3} className="profile-text">
          <ul>
            <li>
              <Image src={estrella1} alt="estrella_active" />
            </li>
            <li>
              <Image src={estrella1} alt="estrella_active" />
            </li>
            <li>
              <Image src={estrella1} alt="estrella_active" />
            </li>
          </ul>
          <p>{this.state.name}</p>
          <span>{this.state.position}</span>
        </Col>
      </React.Fragment>
    );
  }
}

export default withRouter(Userprofile);
