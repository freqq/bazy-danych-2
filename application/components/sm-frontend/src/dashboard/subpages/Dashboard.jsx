import React, { Component } from "react";
import styled from "styled-components";

const DashboardSupbage = styled.div.attrs({ className: "dashbaord-subpage" })`
  margin: 0;
  padding: 40px;
`;

export default class Dashboard extends Component {
  render() {
    return <DashboardSupbage>dashboard</DashboardSupbage>;
  }
}
