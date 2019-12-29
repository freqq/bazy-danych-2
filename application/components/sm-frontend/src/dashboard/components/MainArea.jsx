import React, { Component } from "react";
import styled from "styled-components";

const MainAreaWrapper = styled.div.attrs({ className: "main-area-wrapper" })`
  grid-area: main-area-wrapper;
`;

class MainArea extends Component {
  render() {
    return <MainAreaWrapper>main here</MainAreaWrapper>;
  }
}

export default MainArea;
