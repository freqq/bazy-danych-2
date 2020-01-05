import {
    TICKETS_OK,
    TICKETS_FETCHING,
    TICKETS_FAIL,
    TICKET_REMOVE_OK,
    TICKET_REMOVE_FETCHING,
    TICKET_REMOVE_FAIL,
    TICKET_ADD_FETCHING,
    TICKET_ADD_OK,
    TICKET_ADD_FAIL,
    TICKET_SEARCHING,
    TICKET_SORTING,
    TICKET_GET_FETCHING,
    TICKET_GET_FAIL,
    TICKET_GET_OK,
    TICKET_EDIT_FETCHING,
    TICKET_EDIT_FAIL,
    TICKET_EDIT_OK
  } from "dashboard/subpages/actions/ticketsActions";
  
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
      case TICKETS_OK:
        return {
          ...state,
          data: payload,
          searchData: payload,
          isError: false,
          isFetching: false
        };
      case TICKETS_FAIL:
        return {
          ...state,
          isFetching: false,
          isError: true
        };
      case TICKETS_FETCHING:
        return {
          ...state,
          data: [],
          searchData: [],
          isFetching: true,
          isError: false
        };
      case TICKET_REMOVE_OK:
        return {
          ...state,
          remove: {
            isFetching: false,
            isError: false
          }
        };
      case TICKET_REMOVE_FETCHING:
        return {
          ...state,
          remove: {
            isFetching: true,
            isError: false
          }
        };
      case TICKET_REMOVE_FAIL:
        return {
          ...state,
          remove: {
            isFetching: false,
            isError: true
          }
        };
      case TICKET_ADD_OK:
        return {
          ...state,
          add: {
            isFetching: false,
            isError: false
          }
        };
      case TICKET_ADD_FETCHING:
        return {
          ...state,
          add: {
            isFetching: true,
            isError: false
          }
        };
      case TICKET_ADD_FAIL:
        return {
          ...state,
          add: {
            isFetching: false,
            isError: true
          }
        };
      case TICKET_GET_OK:
        return {
          ...state,
          edit: {
            data: payload,
            isFetching: false,
            isError: false
          }
        };
      case TICKET_GET_FETCHING:
        return {
          ...state,
          edit: {
            data: [],
            isFetching: true,
            isError: false
          }
        };
      case TICKET_GET_FAIL:
        return {
          ...state,
          edit: {
            isFetching: false,
            isError: true
          }
        };
      case TICKET_SEARCHING:
        return {
          ...state,
          searchData: state.data.filter(
            obj =>
              JSON.stringify(obj)
                .toLowerCase()
                .indexOf(payload.toLowerCase()) !== -1
          )
        };
      case TICKET_EDIT_FETCHING:
        return {
          ...state,
          edit: {
            ...state.edit,
            isEditing: true,
            isEditingFail: false
          }
        };
      case TICKET_EDIT_OK:
        return {
          ...state,
          edit: {
            ...state.edit,
            isEditing: false,
            isEditingFail: false
          }
        };
      case TICKET_EDIT_FAIL:
        return {
          ...state,
          edit: {
            ...state.edit,
            isEditing: false,
            isEditingFail: true
          }
        };
      case TICKET_SORTING:
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
  