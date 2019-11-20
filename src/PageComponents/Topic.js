import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Image, Card } from "react-bootstrap";
import UserProfile from "../Components/Userprofile";
import Navigation from "../Components/Nav";
import Menu from "../Components/Menu";
import { Pbutton } from "../Components/Pbutton";
import foto from "../assets/images/foto.png";
import { Back } from "../Components/back";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutAction } from "../Redux/actions/LogoutActions";
import { MiddleAction } from "../Redux/actions/MiddleActions";
import { TopicAction } from "../Redux/actions/TopicActions";
import { TasksAction } from "../Redux/actions/TasksActions";
import { ChefAction } from "../Redux/actions/ChefActions";
import { QualifyAction } from "../Redux/actions/QualifyActions";
import { AnswerAction } from "../Redux/actions/AnswerActions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import store from "../Redux/store";
import { withRouter } from "react-router-dom";
import Slider from "react-smooth-range-input";

const MySwal = withReactContent(Swal);
class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCalificar: "",
      cargoCalificar: "",
      topic: "",
      quest: [],
      foto:
        "https://i.pinimg.com/564x/0d/f7/2c/0df72cbf7fe76dd482ef52776eddebb9.jpg"
    };
  }

  click(e, quest) {
    e.preventDefault();
    this.props.AnswerAction(quest).then(res => {
      if (res === 1) {
        MySwal.fire({
          type: "success",
          title: "Enviado correctamente, continua calificando",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    this.props.history.push("/qualify");
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
                this.props
                  .TopicAction(localStorage.getItem("rtsi"))
                  .then(() => {
                    this.setState({
                      quest: store.getState().Qualify.topic || [],
                      topic: store
                        .getState()
                        .Qualify.chef.find(
                          x => x.id == localStorage.getItem("rtsi")
                        ).text
                    });
                    console.log(
                      store
                        .getState()
                        .Qualify.chef.find(
                          x => x.id == localStorage.getItem("rtsi").text
                        )
                    );
                  });
              });
          });
      });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    var quest = this.state.quest.map((points, index) => (
      <Row className="topic">
        <Col md={2}>
          <div className="num">
            <label>{points.id}</label>
          </div>
        </Col>
        <Col md={7}>
          <p>{points.text}</p>
        </Col>
        <Col md={3}>
          <div className="fireBar">
            <Slider
              value={points.value}
              min={1}
              hasTickMarks={false}
              shouldAnimateOnTouch={false}
              max={10}
              barHeight={10}
              onChange={value =>
                this.setState(prevState => {
                  prevState.quest[index].value = value;
                  return { quest: prevState.quest };
                })
              }
            />
          </div>
        </Col>
      </Row>
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
                        <Col md={2}>
                          <Back to={"/qualify"} />
                        </Col>

                        <Col md={3}>
                          <Image fluid roundedCircle src={this.state.foto} />
                        </Col>
                        <Col md={7} className="nomqualify">
                          <label>{this.state.topic}</label>
                          <p>{this.state.nombreCalificar}</p>
                          <p>{this.state.cargoCalificar}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col md={11}>
                  {quest}
                  <Row>
                    <Col md={{ span: 4, offset: 8 }}>
                      <Pbutton
                        type="submit"
                        contenido="Calificar"
                        onClick={e => this.click(e, this.state.quest)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Topic.propTypes = {
  LogoutAction: PropTypes.func.isRequired,
  MiddleAction: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    TasksAction,
    ChefAction,
    LogoutAction,
    QualifyAction,
    TopicAction,
    AnswerAction
  }
)(withRouter(Topic));
