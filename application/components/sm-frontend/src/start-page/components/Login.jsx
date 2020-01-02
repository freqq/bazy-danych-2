import React, { Component } from "react";
import styled from "styled-components";
import companyLogo from "images/lot.png";
import InputText from "common/components/InputText";
import { Link } from "react-router-dom";
import buttonProgressAnimation from "images/button_indicator.svg";

const LoginWrapper = styled.div.attrs({ className: "login-wrapper" })`
  grid-area: login-area;
  padding: 150px 80px;
`;

const CompanyLogo = styled.img.attrs({ className: "company-logo" })`
  width: 200px;
  margin-bottom: 70px;
`;

const DontRememeber = styled(Link).attrs({ className: "dont-rememver" })`
  text-decoration: underline;
  color: #bbbbca;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }
`;

const LoginButton = styled.button.attrs({ className: "login-button" })`
  padding: 20px 40px;
  width: 100%;
  font-family: "Roboto", sans-serif;
  background: #1a3171;
  border: none;
  border-radius: 5px;
  display: block;
  margin: 20px 0 0 0;
  color: #ffffff;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.6;
  }

  &:hover:disabled {
    cursor: auto;
  }
`;

const ProsList = styled.ul.attrs({ className: "pros-list" })`
  list-style-type: none;
  margin: 40px 0 0 0;
  padding: 0;
`;

const ProsListIcon = styled.i.attrs({ className: "pros-list-icon" })`
  color: #1a3171;
  margin-right: 10px;
`;

const ProsListItem = styled.li.attrs({ className: "pros-list-item" })`
  margin: 10px 0;
  padding: 0;
  display: block;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  font-size: 13px;
  color: #bbbbca;
`;

const ErrorComponent = styled.div.attrs({ className: "error-component" })`
  background: #cf5353;
  margin: 10px 0;
  margin-top: -54px;
  color: #ffffff;
  width: 90%;
  padding: 15px 20px;
  font-size: 12px;
  border-radius: 5px;
  text-align: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginValue: "",
      passwordValue: "",
      canSendForm: false
    };
  }

  renderError = () => (
    <ErrorComponent>Given login or password is incorrect!</ErrorComponent>
  );

  handleLogin = () => {
    var loginRequest = {
      username: this.state.loginValue,
      password: this.state.passwordValue
    };

    this.props.loginFunc(loginRequest);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      if (
        this.state.passwordValue.length > 0 &&
        this.state.loginValue.length > 0
      )
        this.setState({ canSendForm: true });
      else this.setState({ canSendForm: false });
    });
  };

  keyPressed = event => {
    if (
      event.key === "Enter" &&
      this.state.passwordValue.length > 0 &&
      this.state.loginValue.length > 0
    )
      this.handleLogin();
  };

  render() {
    const { loginValue, passwordValue, canSendForm } = this.state;
    const { loginError, loginFetching } = this.props;

    return (
      <LoginWrapper>
        <CompanyLogo src={companyLogo} />
        {loginError ? this.renderError() : null}
        <InputText
          error={loginError}
          onKeyPress={this.keyPressed}
          id="login-input"
          onChange={this.onChange}
          name="loginValue"
          value={loginValue}
          placeholder="login"
        />
        <InputText
          onKeyPress={this.keyPressed}
          error={loginError}
          type="password"
          id="password-input"
          onChange={this.onChange}
          name="passwordValue"
          value={passwordValue}
          placeholder="password"
        />
        <DontRememeber to="/forgot-password">
          Don't remember your password?
        </DontRememeber>
        <LoginButton disabled={!canSendForm} onClick={this.handleLogin}>
          {loginFetching ? (
            <img src={buttonProgressAnimation} alt="buttonProgressAnimation" />
          ) : (
            "Log in"
          )}
        </LoginButton>
        <ProsList>
          <ProsListItem>
            <ProsListIcon className="fas fa-plane-departure" />
            Track every flight on this planet
          </ProsListItem>
          <ProsListItem>
            <ProsListIcon className="fas fa-fighter-jet" />
            Detect any flight collisions
          </ProsListItem>
          <ProsListItem>
            <ProsListIcon className="fas fa-users" />
            Manage all possible data within Airline database
          </ProsListItem>
        </ProsList>
      </LoginWrapper>
    );
  }
}

export default Login;
