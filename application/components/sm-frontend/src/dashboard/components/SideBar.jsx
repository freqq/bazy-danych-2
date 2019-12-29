import React, { Component } from "react";
import styled from "styled-components";
import companyLogo from "images/lot_white.png";
import { Link } from "react-router-dom";

const SideBarWrapper = styled.div.attrs({
  className: "side-bar-wrapper"
})`
  grid-area: side-bar-wrapper;
  background: #3a537a;
`;

const SideBarHeader = styled.div.attrs({ className: "side-bar-header" })`
  background: #354d73;
  padding: 20px;
  border-bottom: 2px solid #3e577f;
`;

const SideBarHeaderImage = styled.img.attrs({
  className: "side-bar-header-image"
})`
  width: 100px;
  margin: 0;
  display: inline-block;
`;

const NavigationHeader = styled.p.attrs({ className: "navigation-header" })`
  font-size: 11px;
  text-transform: uppercase;
  margin: 20px 0 0 15px;
  font-family: "Roboto", sans-serif;
  color: #6079a2;
`;

const SideNavigation = styled.ul.attrs({ className: "side-navigation" })`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const SideNavigationItem = styled.li.attrs({
  className: "side-navigation-item"
})`
  margin: 0;
  padding: 15px;
  transition: 0.15s;
  display: block;
  color: #fefefe;
  border-bottom: 2px solid #3f5981;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #3f5981;
    cursor: pointer;
  }
`;

const SideNavigationLeftIcon = styled.li.attrs({
  className: "side-navigation-left-icon"
})`
  margin: 0 10px 0 0;
  color: #6079a2;
  width: 20px;
`;

const SideNavigationLink = styled(Link).attrs({
  className: "side-navigation-link"
})`
  color: #6079a2;
  font-family: "Roboto", sans-serif;
  text-decoration: none;
`;

const SideNavigationGotoIcon = styled.i.attrs({
  className: "side-navigation-goto-icon fas fa-chevron-right"
})`
    float: right;
`;

const NAVIGATION_ITEMS = [
  {
    name: "Dashboard",
    to: "/admin",
    icon: "fas fa-home"
  },
  {
    name: "Planes",
    to: "/admin/planes",
    icon: "fas fa-plane"
  },
  {
    name: "Clients",
    to: "/admin/clients",
    icon: "fas fa-user-edit"
  },
  {
    name: "Orders",
    to: "/admin/orders",
    icon: "fas fa-shopping-cart"
  },
  {
    name: "Tickets",
    to: "/admin/tickets",
    icon: "fas fa-ticket-alt"
  },
  {
    name: "Carriers",
    to: "/admin/carriers",
    icon: "fas fa-user-tie"
  },
  {
    name: "Flights",
    to: "/admin/flights",
    icon: "fas fa-business-time"
  }
];

class SideBar extends Component {
  renderNavigation = () => (
    <SideNavigation>
      {NAVIGATION_ITEMS.map(item => (
        <SideNavigationItem>
          <SideNavigationLeftIcon className={item.icon} />
          <SideNavigationLink to={item.to}>
            {item.name} <SideNavigationGotoIcon />
          </SideNavigationLink>
        </SideNavigationItem>
      ))}
    </SideNavigation>
  );
  render() {
    return (
      <SideBarWrapper>
        <SideBarHeader>
          <SideBarHeaderImage src={companyLogo} />
        </SideBarHeader>
        <NavigationHeader>Main Navigation</NavigationHeader>
        {this.renderNavigation()}
      </SideBarWrapper>
    );
  }
}

export default SideBar;
