import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutAction } from "../Redux/actions/LogoutActions";
import { MiddleAction } from "../Redux/actions/MiddleActions";
import { MenuAction } from "../Redux/actions/MenuActions";
import { withRouter } from "react-router-dom";
import store from "../Redux/store";


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    };
  }
  componentDidMount() {
    if (localStorage.getItem("ptk")) {
      console.log(localStorage.getItem("ptk"));
      this.props.MenuAction().then(() => {
        this.setState({
          menu: store.getState().Menu.menuitems
        });
      });
    } else {
      this.setState({
        menu: []
      });
      this.props.history.push("/");
    }
  }

  render() {
    var chres = this.state.menu.map((item, index) => (
      <li key={index}>
        <Link to={item.linkto}>
          <Image src={item.src} alt={item.alt} />
          <p>{item.text}</p>
        </Link>
      </li>
    ));

    return <ul className="Menu">{chres}</ul>;
  }
}
Menu.propTypes = {
  MenuAction: PropTypes.func.isRequired
};

export default connect(
  null,
  { MenuAction, LogoutAction, MiddleAction }
)(withRouter(Menu));
