import React, { Component } from "react";
import Login from "start-page/components/Login";
import styled from "styled-components";
import backgroundImage from "images/bg-image-2.jpg";

const StartPageWrapper = styled.div.attrs({ className: "start-page-wrapper" })`
  margin: 0;
  padding: 0;
  background: url("${backgroundImage}") no-repeat;
  background-size: cover;
  min-width: 100vh;
  min-height: 100vh;
  overflow: hidden;
`;

class StartPage extends Component {
  render() {
    return (
      <StartPageWrapper>
        <Login />
      </StartPageWrapper>
    );
  }
}

export default StartPage;
