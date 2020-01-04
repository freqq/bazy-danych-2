import loginRequest from "start-page/handlers/startPageHandler";
import { push } from "react-router-redux";

export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_OK = "LOGIN_OK";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const makeLoginFetching = () => ({
  type: LOGIN_FETCHING
});

export const makeLoginOk = data => ({
  type: LOGIN_OK,
  payload: data
});

export const makeLoginFail = () => ({
  type: LOGIN_FAIL
});

const loginFunction = (loginRequestData, dispatch) => {
  dispatch(makeLoginFetching());

  return loginRequest(loginRequestData)
    .then(res => {
      setTimeout(() => {
        dispatch(makeLoginOk(res.data));
        dispatch(push("/admin"));
      }, 2000);
    })
    .catch(() => {
      dispatch(makeLoginFail());
    });
};

export const loginToApp = loginRequest => dispatch =>
  loginFunction(loginRequest, dispatch);
