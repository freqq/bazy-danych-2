import {
  CLIENTS_OK,
  CLIENTS_FETCHING,
  CLIENTS_FAIL,
  CLIENT_REMOVE_OK,
  CLIENT_REMOVE_FETCHING,
  CLIENT_REMOVE_FAIL,
  CLIENT_ADD_FETCHING,
  CLIENT_ADD_OK,
  CLIENT_ADD_FAIL,
  CLIENT_SEARCHING,
  CLIENT_SORTING,
  CLIENT_GET_FETCHING,
  CLIENT_GET_FAIL,
  CLIENT_GET_OK,
  CLIENT_EDIT_FETCHING,
  CLIENT_EDIT_FAIL,
  CLIENT_EDIT_OK
} from "dashboard/subpages/actions/clientsActions";

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
  }
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case CLIENTS_OK:
      return {
        ...state,
        data: payload,
        searchData: payload,
        isError: false,
        isFetching: false
      };
    case CLIENTS_FAIL:
      return {
        ...state,
        isFetching: false,
        isError: true
      };
    case CLIENTS_FETCHING:
      return {
        ...state,
        data: [],
        searchData: [],
        isFetching: true,
        isError: false
      };
    case CLIENT_REMOVE_OK:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: false
        }
      };
    case CLIENT_REMOVE_FETCHING:
      return {
        ...state,
        remove: {
          isFetching: true,
          isError: false
        }
      };
    case CLIENT_REMOVE_FAIL:
      return {
        ...state,
        remove: {
          isFetching: false,
          isError: true
        }
      };
    case CLIENT_ADD_OK:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: false
        }
      };
    case CLIENT_ADD_FETCHING:
      return {
        ...state,
        add: {
          isFetching: true,
          isError: false
        }
      };
    case CLIENT_ADD_FAIL:
      return {
        ...state,
        add: {
          isFetching: false,
          isError: true
        }
      };
    case CLIENT_GET_OK:
      return {
        ...state,
        edit: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case CLIENT_GET_FETCHING:
      return {
        ...state,
        edit: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case CLIENT_GET_FAIL:
      return {
        ...state,
        edit: {
          isFetching: false,
          isError: true
        }
      };
    case CLIENT_SEARCHING:
      return {
        ...state,
        searchData: state.data.filter(
          obj =>
            JSON.stringify(obj)
              .toLowerCase()
              .indexOf(payload.toLowerCase()) !== -1
        )
      };
    case CLIENT_EDIT_FETCHING:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: true,
          isEditingFail: false
        }
      };
    case CLIENT_EDIT_OK:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: false
        }
      };
    case CLIENT_EDIT_FAIL:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: true
        }
      };
    case CLIENT_SORTING:
      var sortArray = state.searchData;
      var copy = [...sortArray];
      return {
        ...state,
        searchData: copy.sort((a, b) => {
          var x = a[payload];
          var y = b[payload];
          console.log(x, y);
          return x < y ? -1 : x > y ? 1 : 0;
        })
      };
    default:
      return state;
  }
};
