import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";


//AUTH related methods
import { getAuthenticatedUser } from "../helpers/auth";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => {
        if (isAuthProtected && !getAuthenticatedUser()) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );


function mapStateToProps(state) {
  const { error, loading, response } = state.Login;
  return { error, loading, response };
}


export default connect(mapStateToProps)(AppRoute)
