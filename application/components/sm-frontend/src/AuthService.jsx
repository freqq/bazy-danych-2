import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import withLoading, { ProgIndSize } from 'common/utils/withLoading';
import { fetchAuthUserInfo } from 'common/actions/authUserActions';
import { INTERNAL_SERVER_ERROR_PATH } from 'common/paths';
import AuthErrorPlaceholder from 'common/components/AuthErrorPlaceholder';

const HeightWrapper = styled.div`
  height: 100vh;
`;

export class AuthServiceWrapper extends Component {
  componentDidMount() {
    //this.props.fetchAuthUserInfo(this.props.location.pathname);
  }

  shouldDisplayAuthErrorPage = () => !this.props.isLoading && this.props.isError;

  render() {
    const { isError, isLoading, children } = this.props;
    const AuthServiceLoading = withLoading(() => children, ProgIndSize.XX_LARGE);

    return (
      <HeightWrapper>
        <Route
          path={INTERNAL_SERVER_ERROR_PATH}
          render={() => (this.shouldDisplayAuthErrorPage() ? <AuthErrorPlaceholder /> : null)}
        />
        {!isError && <AuthServiceLoading isLoading={isLoading} />}
      </HeightWrapper>
    );
  }
}

AuthServiceWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
  fetchAuthUserInfo: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.common.authUser.isFetching,
  isError: state.common.authUser.isError,
});

const mapDispatchToProps = dispatch => ({
  fetchAuthUserInfo: redirectPath => dispatch(fetchAuthUserInfo(redirectPath)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthServiceWrapper),
);
