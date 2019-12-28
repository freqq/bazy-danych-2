import {
  AUTH_USER_INFO_OK,
  AUTH_USER_INFO_FAIL,
  AUTH_USER_INFO_FETCHING,
} from 'common/actions/authUserActions';

export const AUTH_USER_INITIAL_STATE = {
  data: null,
  isError: false,
  isFetching: false,
};

export default (state = AUTH_USER_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AUTH_USER_INFO_OK:
      return {
        ...state,
        isError: false,
        isFetching: false,
        data: { ...payload.authUser },
      };
    case AUTH_USER_INFO_FAIL:
      return { ...state, data: null, isFetching: false, isError: true };
    case AUTH_USER_INFO_FETCHING:
      return { ...state, data: null, isFetching: true, isError: false };
    default:
      return state;
  }
};
