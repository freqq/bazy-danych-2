import React, { Component } from "react";
import styled from "styled-components";
import errorImage from "images/fetching_error.png";

const FetchingErroPlaceholderWrapper = styled.div.attrs({
  className: "fetching-error-placeholder"
})`
  width: 100%;
  height: 100%;
  background: #fafafa;
  position: relative;
`;

const ErrorImage = styled.img.attrs({ className: "error-image" })`
  width: 600px;
  float: right;
  margin: 50px;
`;

const ErrorText = styled.p.attrs({ className: "error-text" })`
  font-size: 25px;
  position: absolute;
  top: 18%;
  left: 10%;
  padding: 40px;
  background: #efeeee;
`;

export default class FetchingErrorPlaceholder extends Component {
  render() {
    return (
      <FetchingErroPlaceholderWrapper>
        <ErrorText>There was an error while <br />fetching data from server.</ErrorText>
        <ErrorImage src={errorImage} />
      </FetchingErroPlaceholderWrapper>
    );
  }
}
