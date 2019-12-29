import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import withLoading, { ProgIndSize } from "common/utils/withLoading";
import { getUser } from "dashboard/actions/dashboardActions";

const DashboardWrapper = styled.div.attrs({ className: "dasboard-wrapper" })`
  margin: 0;
  padding: 20px;
`;

const DashbaordWithLoading = withLoading(
  DashboardWrapper,
  ProgIndSize.XX_LARGE
);

class Dashboard extends Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { username, firstName, lastName, isLoading } = this.props;

    return (
      <DashbaordWithLoading isLoading={isLoading}>
        USERNAME: {username}
      </DashbaordWithLoading>
    );
  }
}

Dashboard.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  username: state.user.userData.userName,
  firstName: state.user.userData.firstName,
  lastName: state.user.userData.lastName,
  email: state.user.userData.email,
  isLoading: state.user.userData.isLoading,
  isError: state.user.userData.isError
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
