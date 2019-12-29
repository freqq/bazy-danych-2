import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SideBar from "dashboard/components/SideBar";
import MainArea from "dashboard/components/MainArea";

const DashboardWrapperComponent = styled.div.attrs({
  className: "dashboard-wrapper-component"
})`
  display: grid;
  grid-template-columns: 2fr 8fr;
  grid-template-areas: "side-bar-wrapper main-area-wrapper";
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

class DashboardWrapper extends Component {
  render() {
    const { userName, logoutCurrentUser } = this.props;
    return (
      <DashboardWrapperComponent>
        <SideBar />
        <MainArea userName={userName} logoutCurrentUser={logoutCurrentUser} />
      </DashboardWrapperComponent>
    );
  }
}

DashboardWrapper.propTypes = {
  userName: PropTypes.string.isRequired,
  logoutCurrentUser: PropTypes.func.isRequired
};

export default DashboardWrapper;
