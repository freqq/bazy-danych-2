import {
  LOGIN_OK,
  LOGIN_FETCHING,
  LOGIN_FAIL
} from "start-page/actions/startPageActions";

export const INITIAL_STATE = {
  data: null,
  isError: false,
  isFetching: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN_OK:
      return {
        ...state,
        isError: false,
        isFetching: false,
        data: { ...payload }
      };
    case LOGIN_FAIL:
      return { ...state, data: null, isFetching: false, isError: true };
    case LOGIN_FETCHING:
      return { ...state, data: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
