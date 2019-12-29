import React, { Component } from "react";
import styled from "styled-components";
import AppToolbar from "dashboard/components/AppToolbar";
import PropTypes from "prop-types";

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
  height: 50px;
  display: inline-block;
`;

const NavbarLeftMenu = styled.ul.attrs({ className: "navbar-left-menu" })`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 50px;
  display: inline-block;
`;

const NavbarRightMenuItem = styled.li.attrs({
  className: "navbar-right-menu-item"
})`
  margin: 0;
  padding: 10px 20px;
  display: inline-block;
  border-left: 2px solid #efeeee;
  height: 100%;
  font-size: 13px;

  &:hover {
    background: #efeeee;
    cursor: pointer;
  }
`;

const NavbarLeftMenuItem = styled.li.attrs({
  className: "navbar-left-menu-item"
})`
  margin: 0;
  padding: 10px 20px;
  display: inline-block;
  border-right: 2px solid #efeeee;
  height: 100%;
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

class MainArea extends Component {
  render() {
    const { userName } = this.props;

    return (
      <MainAreaWrapper>
        <MainAreaNavBar>
          <NavbarLeftMenu>
            <NavbarLeftMenuItem>123</NavbarLeftMenuItem>
            <NavbarLeftMenuItem>123</NavbarLeftMenuItem>
          </NavbarLeftMenu>
          <NavbarRightMenu>
            <NavbarRightMenuItem>
              <UserCircle>{userName.charAt(0).toUpperCase()}</UserCircle>
              {userName}
            </NavbarRightMenuItem>
            <NavbarRightMenuItem onClick={this.props.logoutCurrentUser}>
              Log out
            </NavbarRightMenuItem>
          </NavbarRightMenu>
        </MainAreaNavBar>
        <AppToolbar />
      </MainAreaWrapper>
    );
  }
}

MainArea.propTypes = {
  userName: PropTypes.string.isRequired,
  logoutCurrentUser: PropTypes.func.isRequired
};

export default MainArea;
