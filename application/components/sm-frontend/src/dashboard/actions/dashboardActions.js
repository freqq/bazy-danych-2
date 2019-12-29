import { getCurrentUser } from "dashboard/handlers/dashboardHandlers";
import { replace, push } from "react-router-redux";

export const USER_FETCHING = "USER_FETCHING";
export const USER_OK = "USER_OK";
export const USER_FAIL = "USER_FAIL";
export const LOGOUT_FETCHING = "LOGOUT_FETCHING";
export const LOGOUT_OK = "LOGOUT_OK";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const makeUserFetching = () => ({
  type: USER_FETCHING
});

export const makeUserOk = data => ({
  type: USER_OK,
  payload: data
});

export const makeUserFail = () => ({
  type: USER_FAIL
});

export const makeLogoutFetching = () => ({
  type: USER_FETCHING
});

export const makeLogoutOk = data => ({
  type: USER_OK,
  payload: data
});

export const makeLogoutFail = () => ({
  type: USER_FAIL
});

const getUserFunction = dispatch => {
  dispatch(makeUserFetching());

  return getCurrentUser()
    .then(res => {
      dispatch(makeUserOk(res.data));
    })
    .catch(() => {
      dispatch(makeUserFail());
    });
};

const logoutFunction = dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch(push("/"));
};

export const getUser = () => dispatch => getUserFunction(dispatch);

export const logout = () => dispatch => logoutFunction(dispatch);
