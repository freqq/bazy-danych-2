import React, { Component } from "react";
import styled from "styled-components";
import AppToolbar from "dashboard/components/AppToolbar";
import PropTypes from "prop-types";
import DashboardRouter from "dashboard/routers/DashboardRouter";
import { Link } from "react-router-dom";

const MainAreaWrapper = styled.div.attrs({ className: "main-area-wrapper" })`
  grid-area: main-area-wrapper;
  font-family: "Roboto", "sans-serif";
  font-weight: 100;
`;

const MainAreaNavBar = styled.div.attrs({ className: "main-area-navbar" })`
  height: 70px;
  background: #f7f7f7;
  border-bottom: 2px solid #efeeee;
`;

const NavbarRightMenu = styled.ul.attrs({ className: "navbar-right-menu" })`
  float: right;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavbarRightMenuItem = styled.li.attrs({
  className: "navbar-right-menu-item"
})`
  margin: 0;
  padding: 10px;
  border-left: 2px solid #efeeee;
  height: 50px;
  display: inline-table;
  font-size: 13px;

  &:hover {
    background: #efeeee;
    cursor: pointer;
  }
`;

const UserCircle = styled.p.attrs({ className: "user-circle" })`
  display: inline-block;
  margin: 12px 5px 5px 0;
  padding: 5px 8px;
  border-radius: 100%;
  background: #3a537a;
  color: #ffffff;
`;

const NavbarLink = styled(Link).attrs({ className: "navbar-link" })`
  text-decoration: none;
  color: #000000;

  &:visited: {
    color: #000000;
  }

  &:acitive: {
    color: #000000;
  }
`;

class MainArea extends Component {
  render() {
    const { userName } = this.props;

    return (
      <MainAreaWrapper>
        <MainAreaNavBar>
          <NavbarRightMenu>
            <NavbarRightMenuItem>
              <NavbarLink to="/admin/profile">
                <UserCircle>{userName.charAt(0).toUpperCase()}</UserCircle>
                {userName}
              </NavbarLink>
            </NavbarRightMenuItem>
            <NavbarRightMenuItem onClick={this.props.logoutCurrentUser}>
              <UserCircle style={{ padding: "5px 7px" }}>
                <i class="fas fa-sign-out-alt"></i>
              </UserCircle>
            </NavbarRightMenuItem>
          </NavbarRightMenu>
        </MainAreaNavBar>
        <AppToolbar />
        <DashboardRouter />
      </MainAreaWrapper>
    );
  }
}

MainArea.propTypes = {
  userName: PropTypes.string.isRequired,
  logoutCurrentUser: PropTypes.func.isRequired
};

export default MainArea;
