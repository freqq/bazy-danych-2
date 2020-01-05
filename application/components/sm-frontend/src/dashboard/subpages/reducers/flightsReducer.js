import {
  FLIGHTS_OK,
  FLIGHTS_FETCHING,
  FLIGHTS_FAIL,
  FLIGHT_REMOVE_OK,
  FLIGHT_REMOVE_FETCHING,
  FLIGHT_REMOVE_FAIL,
  FLIGHT_ADD_FETCHING,
  FLIGHT_ADD_OK,
  FLIGHT_ADD_FAIL,
  FLIGHT_SEARCHING,
  FLIGHT_SORTING,
  FLIGHT_GET_FETCHING,
  FLIGHT_GET_FAIL,
  FLIGHT_GET_OK,
  FLIGHT_EDIT_FETCHING,
  FLIGHT_EDIT_FAIL,
  FLIGHT_EDIT_OK,
  CARRIERS_NAMES_FETCHING,
  CARRIERS_NAMES_FAIL,
  CARRIERS_NAMES_OK,
  PLANES_NAMES_FETCHING,
  PLANES_NAMES_FAIL,
  PLANES_NAMES_OK
} from "dashboard/subpages/actions/flightsActions";

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
  },
  edit: {
    data: [],
    isError: false,
    isFetching: false,
    isEditing: false,
    isEditingFail: false
  },
  carriers: {
    data: [],
    isError: false,
    isFetching: false
  },
  planes: {
    data: [],
    isError: false,
    isFetching: false
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case FLIGHTS_OK:
      return {
        ...state,
        data: payload,
        searchData: payload,
        isError: false,
        isFetching: false
      };
    case FLIGHTS_FAIL:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case FLIGHTS_FETCHING:
      return {
        ...state,
        data: [],
        searchData: [],
        isFetching: true,
        isError: false
      };
    case FLIGHT_REMOVE_OK:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: false
        }
      };
    case FLIGHT_REMOVE_FETCHING:
      return {
        ...state,
        remove: {
          isFetching: true,
          isError: false
        }
      };
    case FLIGHT_REMOVE_FAIL:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: true
        }
      };
    case FLIGHT_ADD_OK:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: false
        }
      };
    case FLIGHT_ADD_FETCHING:
      return {
        ...state,
        add: {
          isFetching: true,
          isError: false
        }
      };
    case FLIGHT_ADD_FAIL:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: true
        }
      };
    case FLIGHT_GET_OK:
      return {
        ...state,
        edit: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case FLIGHT_GET_FETCHING:
      return {
        ...state,
        edit: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case FLIGHT_GET_FAIL:
      return {
        ...state,
        edit: {
          isFetching: false,
          isError: true
        }
      };
    case FLIGHT_SEARCHING:
      return {
        ...state,
        searchData: state.data.filter(
          obj =>
            JSON.stringify(obj)
              .toLowerCase()
              .indexOf(payload.toLowerCase()) !== -1
        )
      };
    case FLIGHT_EDIT_FETCHING:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: true,
          isEditingFail: false
        }
      };
    case FLIGHT_EDIT_OK:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: false
        }
      };
    case FLIGHT_EDIT_FAIL:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: true
        }
      };
    case CARRIERS_NAMES_FETCHING:
      return {
        ...state,
        carriers: {
          ...state.carriers,
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case CARRIERS_NAMES_FAIL:
      return {
        ...state,
        carriers: {
          ...state.carriers,
          isFetching: false,
          isError: true
        }
      };
    case CARRIERS_NAMES_OK:
      return {
        ...state,
        carriers: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case PLANES_NAMES_FETCHING:
      return {
        ...state,
        planes: {
          ...state.carriers,
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case PLANES_NAMES_FAIL:
      return {
        ...state,
        planes: {
          ...state.carriers,
          isFetching: false,
          isError: true
        }
      };
    case PLANES_NAMES_OK:
      return {
        ...state,
        planes: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case FLIGHT_SORTING:
      var sortArray = state.searchData;
      var copy = [...sortArray];
      return {
        ...state,
        searchData: copy.sort((a, b) => {
          var x = a[payload];
          var y = b[payload];
          return x < y ? -1 : x > y ? 1 : 0;
        })
      };
    default:
      return state;
  }
};
