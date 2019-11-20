import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Image, Card } from "react-bootstrap";
import UserProfile from "../Components/Userprofile";
import Navigation from "../Components/Nav";
import Menu from "../Components/Menu";
import { Pbutton } from "../Components/Pbutton";
import { Back } from "../Components/back";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutAction } from "../Redux/actions/LogoutActions";
import { MiddleAction } from "../Redux/actions/MiddleActions";
import { TasksAction } from "../Redux/actions/TasksActions";
import { ChefAction } from "../Redux/actions/ChefActions";
import { QualifyAction } from "../Redux/actions/QualifyActions";
import store from "../Redux/store";
import { withRouter } from "react-router-dom";

class Qualify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCalificar: "",
      cargoCalificar: "",
      foto: "https://gatosinpelo.com/wp-content/uploads/2019/03/Sphynx-2.jpeg",
      QualifyPoints: []
    };
  }
  click(e, id) {
    e.preventDefault();
    console.log(id);
    localStorage.setItem("rtsi", id);
    this.props.history.push("/topic");
  }

  componentDidMount() {
    if (localStorage.getItem("ptk")) {
      this.props.TasksAction().then(res => {
        console.log(res);
        console.log(
          store
            .getState()
            .Task.tasks.find(x => x.id == localStorage.getItem("rtse"))
        );
        this.props
          .QualifyAction(
            store
              .getState()
              .Task.tasks.find(x => x.id == localStorage.getItem("rtse"))
              .rated_user
          )
          .then(() => {
            this.setState({
              nombreCalificar:
                `${store.getState().Qualify.user[0].first_name} ${
                  store.getState().Qualify.user[0].last_name
                }` || [],
              cargoCalificar:
                `${store.getState().Qualify.user[0].payload.position}` || []
            });
            console.log(store.getState().Qualify.user[0].payload.position);
            this.props
              .ChefAction(
                store
                  .getState()
                  .Task.tasks.find(x => x.id == localStorage.getItem("rtse"))
                  .rating_type
              )
              .then(() => {
                this.setState({
                  QualifyPoints: store.getState().Qualify.chef || []
                });
              });
          });
      });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    var QualifyPoints = this.state.QualifyPoints.map(points => (
      <Col md={3} key={points.id}>
        <Link onClick={e => this.click(e, points.id)} to="/topic">
          <Card className="QualifyCard">
            <Card.Img variant="top" src={points.srcimg} />
            <Card.Body>
              <Card.Link href="/qualify">{points.text}</Card.Link>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ));
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
              <Container fluid className="Panel Qualify">
                <Col md={11}>
                  <Row>
                    <Col className="Panel-banner" md={12}>
                      <Row>
                        <Col md={1}>
                          <Back to={"/tasks"} />
                        </Col>
                        <Col md={3} className="Panel-text">
                          <p>CARA CHEF</p>
                        </Col>
                        <Col md={3}>
                          <Image roundedCircle src={this.state.foto} />
                        </Col>
                        <Col md={5} className="nomqualify">
                          <p>{this.state.nombreCalificar}</p>
                          <p>{this.state.cargoCalificar}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col md={11}>
                  <Row>{QualifyPoints}</Row>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Qualify.propTypes = {
  LogoutAction: PropTypes.func.isRequired,
  TasksAction: PropTypes.func.isRequired,
  QualifyAction: PropTypes.func.isRequired,
  ChefAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { TasksAction, ChefAction, LogoutAction, QualifyAction }
)(withRouter(Qualify));
