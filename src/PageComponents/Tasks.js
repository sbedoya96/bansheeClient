import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { Container, Col, Row, Image, Table, Form } from "react-bootstrap";
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
import store from "../Redux/store";

import { connect } from "react-redux";
import { LogoutAction } from "../Redux/actions/LogoutActions";
import { TasksAction } from "../Redux/actions/TasksActions";

import { withRouter } from "react-router-dom";
//import store from '../Redux/store';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  click(e, id) {
    e.preventDefault();
    console.log(id);
    localStorage.setItem("rtse", id);
    this.props.history.push("/qualify");
  }
  componentDidMount() {
    if (localStorage.getItem("ptk")) {
      this.props.TasksAction().then(() => {
        this.setState({
          data: store.getState().Task.tasks || []
        });
      });
    } else {
      this.setState({
        data: []
      });
      this.props.history.push("/");
    }
  }

  render() {
    var data = this.state.data.map(data => (
      <tr onClick={e => this.click(e, data.id)} key={data.id}>
        <td>
          <Form.Check readOnly checked={data.checked} />
        </td>
        <td>{data.fecha}</td>
        <td>{data.tarea}</td>
      </tr>
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
              <Container fluid className="Panel">
                <Col md={11}>
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
                </Col>
                <Col md={11}>
                  <Table striped bordered hover className="Task-table">
                    <thead>
                      <tr>
                        <th colSpan="2">Fecha Limite</th>
                        <th>Tarea</th>
                      </tr>
                    </thead>
                    <tbody>{data}</tbody>
                  </Table>
                </Col>
              </Container>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Tasks.propTypes = {
  LogoutAction: PropTypes.func.isRequired,
  TasksAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { TasksAction, LogoutAction }
)(withRouter(Tasks));
