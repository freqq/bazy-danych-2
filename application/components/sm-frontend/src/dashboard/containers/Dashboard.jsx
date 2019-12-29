import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

const DashboardWrapper = styled.div.attrs({ className: "dasboard-wrapper" })`
  margin: 0;
  padding: 20px;
`;

class Dashboard extends Component {
  render() {
    const { username, firstName, lastName } = this.props;

    return <DashboardWrapper>USERNAME: {username}</DashboardWrapper>;
  }
}

Dashboard.propTypes = {
  username: PropTypes.func.isRequired,
  firstName: PropTypes.func.isRequired,
  lastName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  username: state.user.userData.data.username,
  firstName: state.user.userData.data.username,
  lastName: state.user.userData.data.username
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
