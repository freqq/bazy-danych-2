import getAuthUserInfo from 'common/handlers/authUserHandler';
import { push, replace } from 'react-router-redux';
import { INTERNAL_SERVER_ERROR_PATH, NETGUARD_SMC_PATH } from 'common/paths';

export const AUTH_USER_INFO_OK = 'AUTH_USER_INFO_OK';
export const AUTH_USER_INFO_FAIL = 'AUTH_USER_INFO_FAIL';
export const AUTH_USER_INFO_FETCHING = 'AUTH_USER_INFO_FETCHING';
export const ERROR_FETCHING_AUTHENTICATED_USER_INFO =
  'There was an error fetching authenticated user info';

const getRedirectionPath = currentPath =>
  currentPath !== INTERNAL_SERVER_ERROR_PATH ? currentPath : NETGUARD_SMC_PATH;

export const makeAuthUserInfoOk = authUser => ({
  type: AUTH_USER_INFO_OK,
  payload: { authUser },
});

export const makeAuthUserInfoFetching = () => ({
  type: AUTH_USER_INFO_FETCHING,
});

export const makeAuthUserInfoFail = () => ({
  type: AUTH_USER_INFO_FAIL,
});

export const fetchAuthUserInfo = currentPath => dispatch => {
  dispatch(makeAuthUserInfoFetching());
  return getAuthUserInfo()
    .then(res => {
      dispatch(makeAuthUserInfoOk(res.data));
      dispatch(replace(getRedirectionPath(currentPath)));
    })
    .catch(() => {
      dispatch(makeAuthUserInfoFail());
      dispatch(push(INTERNAL_SERVER_ERROR_PATH));
    });
};
