import React, { Component } from "react";
import styled from "styled-components";
import companyLogo from "images/lot.png";
import InputText from "common/components/InputText";

const LoginWrapper = styled.div.attrs({ className: "login-wrapper" })`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  color: #000000;
  width: 75vh;
  height: 45vh;
  border: 1px solid #cecece;
  border-radius: 5px;
`;

const LoginArea = styled.div.attrs({ className: "login-area" })`
  padding: 10px;
`;

const CompanyLogo = styled.img.attrs({ className: "company-logo" })`
  width: 35%;
  margin: 0 auto;
  display: block;
  margin-top: 10px;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginValue: "",
      passwordValue: ""
    };
  }

  onChange = () => {
    console.log("123");
  };

  render() {
    const { loginValue, passwordValue } = this.state;

    return (
      <LoginWrapper>
        <LoginArea>
          <CompanyLogo src={companyLogo} />
          <InputText
            name="loginValue"
            id="login-input"
            label="Login"
            value={loginValue}
            onChange={this.onChange}
          />
          <InputText
            name="passwordValue"
            id="password-input"
            label="Password"
            value={passwordValue}
            onChange={this.onChange}
          />
        </LoginArea>
      </LoginWrapper>
    );
  }
}

export default Login;
