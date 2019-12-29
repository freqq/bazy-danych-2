import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component {
  render() {
    const { component: Component, userData, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          userData ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
    );
  }
}

PrivateRoute.propTypes = {
  userData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userData: state.user.userData.data
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
