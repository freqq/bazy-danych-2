import {
  VALUABLE_ORDERS_FETCHING,
  VALUABLE_ORDERS_FAIL,
  VALUABLE_ORDERS_OK,
  PLANES_CHART_FETCHING,
  PLANES_CHART_FAIL,
  PLANES_CHART_OK,
  PLANES_BIG_CHART_FETCHING,
  PLANES_BIG_CHART_FAIL,
  PLANES_BIG_CHART_OK
} from "dashboard/subpages/actions/dashboardActions";

export const INITIAL_STATE = {
  orders: {
    data: [],
    isError: false,
    isFetching: false
  },
  planes: {
    data: [],
    isError: false,
    isFetching: false
  },
  largePlanes: {
    data: [],
    isError: false,
    isFetching: false
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case VALUABLE_ORDERS_OK:
      return {
        ...state,
        orders: {
          data: payload,
          isError: false,
          isFetching: false
        }
      };
    case VALUABLE_ORDERS_FAIL:
      return {
        orders: {
          ...state,
          isFetching: false,
          isError: true
        }
      };
    case VALUABLE_ORDERS_FETCHING:
      return {
        ...state,
        orders: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case PLANES_CHART_OK:
      return {
        ...state,
        planes: {
          data: payload,
          isError: false,
          isFetching: false
        }
      };
    case PLANES_CHART_FAIL:
      return {
        planes: {
          ...state,
          isFetching: false,
          isError: true
        }
      };
    case PLANES_CHART_FETCHING:
      return {
        ...state,
        planes: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case PLANES_BIG_CHART_OK:
      return {
        ...state,
        largePlanes: {
          data: payload,
          isError: false,
          isFetching: false
        }
      };
    case PLANES_BIG_CHART_FAIL:
      return {
        largePlanes: {
          ...state,
          isFetching: false,
          isError: true
        }
      };
    case PLANES_BIG_CHART_FETCHING:
      return {
        ...state,
        largePlanes: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    default:
      return state;
  }
};
