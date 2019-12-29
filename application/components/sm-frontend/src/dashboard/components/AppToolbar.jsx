import React, { Component } from "react";
import styled from "styled-components";

const AppToolbarWrapper = styled.div.attrs({
  className: "app-toolbar-wrapper"
})`
  background: #f5f4f4;
  width: 100%;
  border-bottom: 2px solid #eeeeee;
  padding: 40px;
`;

const ToolbarHeader = styled.p.attrs({ className: "toolbar-header" })`
  color: #40587d;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const ToolbarSubheader = styled.p.attrs({ className: "toolbar-subheader" })`
  font-size: 14px;
  color: #c3c3c3;
  margin: 5px 0 0 0;
  padding: 0;
  font-weight: 100;
`;

class AppToolbar extends Component {
  render() {
    return (
      <AppToolbarWrapper>
        <ToolbarHeader>Welome to Airline data manager !</ToolbarHeader>
        <ToolbarSubheader>The place when your dreams come true.</ToolbarSubheader>
      </AppToolbarWrapper>
    );
  }
}

export default AppToolbar;
