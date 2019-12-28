import React, { Component } from "react";
import styled from "styled-components";
import MainArea from "common/components/MainArea";
import SideNav from "common/components/SideNav";

const LayoutWrapper = styled.div.attrs({ className: "layout-wrapper" })`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-template-areas: "sidenav mainarea";
`;

class Layout extends Component {
  render() {
    return <LayoutWrapper>
        <SideNav />
        <MainArea>123</MainArea>
    </LayoutWrapper>;
  }
}

export default Layout;
