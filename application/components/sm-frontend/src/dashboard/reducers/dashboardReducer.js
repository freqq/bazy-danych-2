import {
  USER_OK,
  USER_FETCHING,
  USER_FAIL
} from "dashboard/actions/dashboardActions";

export const INITIAL_STATE = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  isError: false,
  isFetching: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case USER_OK:
      return {
        ...state,
        userName: payload.userName,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        isError: false,
        isFetching: false
      };
    case USER_FAIL:
      return {
        ...state,
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        isFetching: false,
        isError: true
      };
    case USER_FETCHING:
      return {
        ...state,
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        isFetching: true,
        isError: false
      };
    default:
      return state;
  }
};
