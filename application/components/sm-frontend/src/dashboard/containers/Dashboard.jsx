import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardWrapper from "dashboard/containers/DashboardWrapper";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import { getUser, logout } from "dashboard/actions/dashboardActions";

const DashboardWithLoading = withLoading(
  DashboardWrapper,
  ProgIndSize.XX_LARGE
);

class Dashboard extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    const {
      userName,
      firstName,
      lastName,
      isLoading,
      logoutCurrentUser
    } = this.props;

    return (
      <DashboardWithLoading
        isLoading={isLoading}
        userName={userName}
        logoutCurrentUser={logoutCurrentUser}
      />
    );
  }
}

Dashboard.propTypes = {
  userName: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  logoutCurrentUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  userName: state.user.userData.userName,
  firstName: state.user.userData.firstName,
  lastName: state.user.userData.lastName,
  email: state.user.userData.email,
  isLoading: state.user.userData.isLoading,
  isError: state.user.userData.isError
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getUser()),
  logoutCurrentUser: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
