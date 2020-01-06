import React, { Component } from "react";
import LoginArea from "start-page/components/Login";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import loginBg from "images/login-bg-5.jpg";
import { loginToApp } from "start-page/actions/startPageActions";

const StartPageWrapper = styled.div.attrs({ className: "start-page-wrapper" })`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 3fr 6fr;
  grid-template-areas: "login-area text-area";
`;

const TextArea = styled.div.attrs({ className: "text-area" })`
  grid-area: text-area;
  background: url(${loginBg}) no-repeat;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

class StartPage extends Component {
  render() {
    const { loginFetching, loginError, loginFunc } = this.props;

    return (
      <StartPageWrapper>
        <LoginArea
          loginFunc={loginFunc}
          loginFetching={loginFetching}
          loginError={loginError}
        />
        <TextArea />
      </StartPageWrapper>
    );
  }
}

StartPage.propTypes = {
  loginToApp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loginFetching: state.auth.authData.isFetching,
  loginError: state.auth.authData.isError
});

const mapDispatchToProps = dispatch => ({
  loginFunc: loginReq => dispatch(loginToApp(loginReq))
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
