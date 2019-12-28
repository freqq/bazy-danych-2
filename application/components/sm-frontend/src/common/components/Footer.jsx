import React, { Component } from "react";
import styled from "styled-components";

const FooterComponent = styled.footer.attrs({ className: "footer-component" })`
  min-height: 100px;
  background: #ffffff;
  border-top: 1px solid #cecece;
  padding: 20px;
  font-weight: 100;
  font-size: 14px;
  font-family: "Rajdhani", sans-serif;
  text-align: center;
`;

class Footer extends Component {
  render() {
    return <FooterComponent>2019 &copy; WROCAirline</FooterComponent>;
  }
}

export default Footer;
