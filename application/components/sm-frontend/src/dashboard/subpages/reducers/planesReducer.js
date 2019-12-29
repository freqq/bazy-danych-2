import {
  PLANES_OK,
  PLANES_FETCHING,
  PLANES_FAIL,
  PLANE_REMOVE_OK,
  PLANE_REMOVE_FETCHING,
  PLANE_REMOVE_FAIL
} from "dashboard/subpages/actions/planesActions";

export const INITIAL_STATE = {
  data: [],
  isError: false,
  isFetching: false,
  remove: {
    isError: false,
    isFetching: false
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PLANES_OK:
      return {
        ...state,
        data: payload,
        isError: false,
        isFetching: false
      };
    case PLANES_FAIL:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case PLANES_FETCHING:
      return {
        ...state,
        data: [],
        isFetching: true,
        isError: false
      };
    case PLANE_REMOVE_OK:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: false
        }
      };
    case PLANE_REMOVE_FETCHING:
      return {
        ...state,
        remove: {
          isFetching: true,
          isError: false
        }
      };
    case PLANE_REMOVE_FAIL:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: true
        }
      };
    default:
      return state;
  }
};
