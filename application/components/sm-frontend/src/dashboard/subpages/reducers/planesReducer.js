import {
  PLANES_OK,
  PLANES_FETCHING,
  PLANES_FAIL,
  PLANE_REMOVE_OK,
  PLANE_REMOVE_FETCHING,
  PLANE_REMOVE_FAIL,
  PLANE_ADD_FETCHING,
  PLANE_ADD_OK,
  PLANE_ADD_FAIL,
  PLANE_SEARCHING
} from "dashboard/subpages/actions/planesActions";

export const INITIAL_STATE = {
  data: [],
  searchData: [],
  isError: false,
  isFetching: false,
  remove: {
    isError: false,
    isFetching: false
  },
  add: {
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
        searchData: payload,
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
        searchData: [],
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
    case PLANE_ADD_OK:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: false
        }
      };
    case PLANE_ADD_FETCHING:
      return {
        ...state,
        add: {
          isFetching: true,
          isError: false
        }
      };
    case PLANE_ADD_FAIL:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: true
        }
      };
    case PLANE_SEARCHING:
      return {
        ...state,
        searchData: state.data.filter(
          obj =>
            JSON.stringify(obj)
              .toLowerCase()
              .indexOf(payload.toLowerCase()) !== -1
        )
      };
    default:
      return state;
  }
};
