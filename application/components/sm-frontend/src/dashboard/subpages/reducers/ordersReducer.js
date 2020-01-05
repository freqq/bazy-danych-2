import {
  ORDERS_OK,
  ORDERS_FETCHING,
  ORDERS_FAIL,
  ORDER_REMOVE_OK,
  ORDER_REMOVE_FETCHING,
  ORDER_REMOVE_FAIL,
  ORDER_ADD_FETCHING,
  ORDER_ADD_OK,
  ORDER_ADD_FAIL,
  ORDER_SEARCHING,
  ORDER_SORTING,
  ORDER_GET_FETCHING,
  ORDER_GET_FAIL,
  ORDER_GET_OK,
  ORDER_EDIT_FETCHING,
  ORDER_EDIT_FAIL,
  ORDER_EDIT_OK,
  FLIGHTS_FETCH_FETCHING,
  FLIGHTS_FETCH_FAIL,
  FLIGHTS_FETCH_OK,
  CLIENTS_FETCH_FETCHING,
  CLIENTS_FETCH_FAIL,
  CLIENTS_FETCH_OK,
  TICKETS_FETCH_FETCHING,
  TICKETS_FETCH_FAIL,
  TICKETS_FETCH_OK
} from "dashboard/subpages/actions/ordersActions";

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
  tickets: {
    data: [],
    isError: false,
    isFetching: false
  },
  flights: {
    data: [],
    isError: false,
    isFetching: false
  },
  clients: {
    data: [],
    isError: false,
    isFetching: false
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ORDERS_OK:
      return {
        ...state,
        data: payload,
        searchData: payload,
        isError: false,
        isFetching: false
      };
    case ORDERS_FAIL:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case ORDERS_FETCHING:
      return {
        ...state,
        data: [],
        searchData: [],
        isFetching: true,
        isError: false
      };
    case ORDER_REMOVE_OK:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: false
        }
      };
    case ORDER_REMOVE_FETCHING:
      return {
        ...state,
        remove: {
          isFetching: true,
          isError: false
        }
      };
    case ORDER_REMOVE_FAIL:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: true
        }
      };
    case ORDER_ADD_OK:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: false
        }
      };
    case ORDER_ADD_FETCHING:
      return {
        ...state,
        add: {
          isFetching: true,
          isError: false
        }
      };
    case ORDER_ADD_FAIL:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: true
        }
      };
    case ORDER_GET_OK:
      return {
        ...state,
        edit: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case ORDER_GET_FETCHING:
      return {
        ...state,
        edit: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case ORDER_GET_FAIL:
      return {
        ...state,
        edit: {
          isFetching: false,
          isError: true
        }
      };
    case ORDER_SEARCHING:
      return {
        ...state,
        searchData: state.data.filter(
          obj =>
            JSON.stringify(obj)
              .toLowerCase()
              .indexOf(payload.toLowerCase()) !== -1
        )
      };
    case ORDER_EDIT_FETCHING:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: true,
          isEditingFail: false
        }
      };
    case ORDER_EDIT_OK:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: false
        }
      };
    case ORDER_EDIT_FAIL:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: true
        }
      };
    case FLIGHTS_FETCH_FETCHING:
      return {
        ...state,
        flights: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case FLIGHTS_FETCH_OK:
      return {
        ...state,
        flights: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case FLIGHTS_FETCH_FAIL:
      return {
        ...state,
        flights: {
          ...state.flights,
          isFetching: false,
          isError: true
        }
      };
    case TICKETS_FETCH_FETCHING:
      return {
        ...state,
        tickets: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case TICKETS_FETCH_OK:
      return {
        ...state,
        tickets: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case TICKETS_FETCH_FAIL:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          isFetching: false,
          isError: true
        }
      };
    case CLIENTS_FETCH_FETCHING:
      return {
        ...state,
        clients: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case CLIENTS_FETCH_OK:
      return {
        ...state,
        clients: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case CLIENTS_FETCH_FAIL:
      return {
        ...state,
        clients: {
          ...state.tickets,
          isFetching: false,
          isError: true
        }
      };
    case ORDER_SORTING:
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
