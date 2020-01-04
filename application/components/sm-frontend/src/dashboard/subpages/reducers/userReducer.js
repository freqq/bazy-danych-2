import {
  FETCH_PROFILE_FETCHING,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_OK,
  EDIT_PROFILE_FETCHING,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_OK
} from "dashboard/subpages/actions/userActions";

export const INITIAL_STATE = {
  data: [],
  isError: false,
  isFetching: false,
  isEditing: false
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FETCH_PROFILE_OK:
      return {
        ...state,
        data: payload,
        isError: false,
        isFetching: false
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case FETCH_PROFILE_FETCHING:
      return {
        ...state,
        data: [],
        isFetching: true,
        isError: false
      };
    case EDIT_PROFILE_FETCHING:
      return {
        ...state,
        isEditing: true
      };
    case EDIT_PROFILE_FAIL:
      return {
        isEditing: false,
        isError: true
      };
    case EDIT_PROFILE_OK:
      return {
        ...state,
        isEditing: false
      };
    default:
      return state;
  }
};
