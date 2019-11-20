import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Profile from "./PageComponents/Profile";
import Tasks from "./PageComponents/Tasks";
import Login from "./PageComponents/Login";
import store from "./Redux/store";
//import history from './history';
import { NoMatchPage } from "./PageComponents/404";
import Qualify from "./PageComponents/Qualify";
import Topic from "./PageComponents/Topic";
import ResetPassword from "./PageComponents/ResetPassword";

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/tasks" component={Tasks} />
            <Route exact path="/Qualify" component={Qualify} />
            <Route exact path="/Topic" component={Topic} />
            <Route exact path="/ResetPassword" component={ResetPassword} />
            <Route exact path="/" component={Login} />
            <Route component={NoMatchPage} />
          </Switch>
        </Router>
      </React.Fragment>
    </Provider>
  );
}

export default App;
