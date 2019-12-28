import React, { Component } from "react";
import styled from "styled-components";

const MainAreaWrapper = styled.div.attrs({ className: "mainarea-component" })`
  grid-area: mainarea;
`;

class MainArea extends Component {
  render() {
    return <MainAreaWrapper>
        main
    </MainAreaWrapper>;
  }
}

export default MainArea;
