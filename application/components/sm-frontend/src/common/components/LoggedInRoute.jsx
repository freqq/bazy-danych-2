import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem("jwtToken") ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/admin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default LoggedInRoute;
