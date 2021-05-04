import React, { Component } from "react";
import { Switch, BrowserRouter as Router, withRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import { getAuthenticatedUser } from "./helpers/auth";


// layouts
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <React.Fragment>
        <Router>
          <Switch>
            {!getAuthenticatedUser() ? publicRoutes.map((route, idx) => (
              <AppRoute
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
                isAuthProtected={false}
              />
            ))
              :
              authProtectedRoutes.map((route, idx) => (
                <AppRoute
                  path={route.path}
                  layout={VerticalLayout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                />
              ))}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
    login: state.Login
  };
};

export default withRouter(connect(mapStateToProps, null)(App));
