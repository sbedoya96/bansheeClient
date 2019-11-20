import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import UserProfile from "../Components/Userprofile";
import Navigation from "../Components/Nav";
import Menu from "../Components/Menu";
import { Ctarget } from "../Components/Ctarget";
import { Pbutton } from "../Components/Pbutton";
import Graph from "../Components/Graph";
import { Onfire } from "../Components/Onfire";
import { TopItem } from "../Components/Topitem";
import pocion from "../assets/images/pocion.png";
import pique from "../assets/images/pique.png";
import top from "../assets/images/top.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutAction } from "../Redux/actions/LogoutActions";
import { MiddleAction } from "../Redux/actions/MiddleActions";
import { withRouter } from "react-router-dom";
//import store from '../Redux/store';
const load =
  "https://i.pinimg.com/originals/97/e9/42/97e942ce7fc4e9d4ea6d844a382f251f.gif";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    if (localStorage.getItem("ptk")) {
      this.props.MiddleAction().then(res => {
        console.log(res);
        if (res === 400) {
          this.props.LogoutAction();
          this.props.history.push("/");
        }
      });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Fragment>
        <Navigation />
        <Container fluid className="profile-container">
          <Container fluid>
            <UserProfile />
          </Container>
        </Container>
        <Container fluid>
          <Row>
            <Col md={3}>
              <Row>
                <Col>
                  <Menu />
                  <Pbutton contenido="PEDIR PIQUE" />
                  <Pbutton contenido="DAR PIQUE" />
                  <Link to="/profile" className="CChef">
                    ¿QUÉ ES CARA CHEF?
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col md={9} className="global">
              <Container fluid className="Panel">
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col className="Panel-banner" md={12}>
                        <Row>
                          <Col md={4} className="Panel-img">
                            <Image src={pocion} />
                          </Col>
                          <Col md={8} className="Panel-text">
                            <p>FALTAN</p>
                            <p>20 DÍAS</p>
                            <p>para que se acabe el trimestre</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col className="Panel-tareas-pendientes" md={9}>
                            <label>
                              tareas <span>pendientes</span>
                            </label>
                          </Col>
                          <Col md={3}>
                            <Link to="/tasks" className="CChef">
                              VER TODAS >
                            </Link>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4}>
                            <Ctarget
                              text="Completar 160 puntos ántes del"
                              fecha="Jueves 30 de abril"
                            />
                          </Col>
                          <Col md={4}>
                            <Ctarget
                              text="Completar 160 puntos ántes del"
                              fecha="Jueves 30 de abril"
                            />
                          </Col>
                          <Col md={4}>
                            <Ctarget
                              text="Completar 160 puntos ántes del"
                              fecha="Jueves 30 de abril"
                            />
                          </Col>
                        </Row>
                        <Row className="graph">
                          <Col md={8}>
                            <label>RESULTADOS</label>
                            <p>Compara tu crecimiento con tu equipo.</p>
                            <span>
                              <Link to="#" className="CChef">
                                {" "}
                                VER MAS >
                              </Link>
                            </span>
                            <Graph />
                          </Col>
                          <Col md={4}>
                            <Onfire
                              image={pique}
                              dia={12}
                              mes={"junio"}
                              puntos={80}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4} className="top">
                    <Image fluid src={top} alt="" />
                    <label>
                      LOS QUE TIENEN <span>MÁS PIQUE</span>
                    </label>
                    <ul>
                      {/* <TopItem name={"sergio bedoya"} puntos={15} /> */}
                      <Image fluid rounded src={load} />
                    </ul>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  LogoutAction: PropTypes.func.isRequired,
  MiddleAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { MiddleAction, LogoutAction }
)(withRouter(Profile));
