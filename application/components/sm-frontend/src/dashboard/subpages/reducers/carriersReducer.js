import {
    CARRIERS_OK,
    CARRIERS_FETCHING,
    CARRIERS_FAIL,
    CARRIER_REMOVE_OK,
    CARRIER_REMOVE_FETCHING,
    CARRIER_REMOVE_FAIL,
    CARRIER_ADD_FETCHING,
    CARRIER_ADD_OK,
    CARRIER_ADD_FAIL,
    CARRIER_SEARCHING,
    CARRIER_SORTING,
    CARRIER_GET_FETCHING,
    CARRIER_GET_FAIL,
    CARRIER_GET_OK,
    CARRIER_EDIT_FETCHING,
    CARRIER_EDIT_FAIL,
    CARRIER_EDIT_OK
  } from "dashboard/subpages/actions/carriersActions";
  
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
      case CARRIERS_OK:
        return {
          ...state,
          data: payload,
          searchData: payload,
          isError: false,
          isFetching: false
        };
      case CARRIERS_FAIL:
        return {
          ...state,
          isFetching: false,
          isError: true
        };
      case CARRIERS_FETCHING:
        return {
          ...state,
          data: [],
          searchData: [],
          isFetching: true,
          isError: false
        };
      case CARRIER_REMOVE_OK:
        return {
          ...state,
          remove: {
            isFetching: false,
            isError: false
          }
        };
      case CARRIER_REMOVE_FETCHING:
        return {
          ...state,
          remove: {
            isFetching: true,
            isError: false
          }
        };
      case CARRIER_REMOVE_FAIL:
        return {
          ...state,
          remove: {
            isFetching: false,
            isError: true
          }
        };
      case CARRIER_ADD_OK:
        return {
          ...state,
          add: {
            isFetching: false,
            isError: false
          }
        };
      case CARRIER_ADD_FETCHING:
        return {
          ...state,
          add: {
            isFetching: true,
            isError: false
          }
        };
      case CARRIER_ADD_FAIL:
        return {
          ...state,
          add: {
            isFetching: false,
            isError: true
          }
        };
      case CARRIER_GET_OK:
        return {
          ...state,
          edit: {
            data: payload,
            isFetching: false,
            isError: false
          }
        };
      case CARRIER_GET_FETCHING:
        return {
          ...state,
          edit: {
            data: [],
            isFetching: true,
            isError: false
          }
        };
      case CARRIER_GET_FAIL:
        return {
          ...state,
          edit: {
            isFetching: false,
            isError: true
          }
        };
      case CARRIER_SEARCHING:
        return {
          ...state,
          searchData: state.data.filter(
            obj =>
              JSON.stringify(obj)
                .toLowerCase()
                .indexOf(payload.toLowerCase()) !== -1
          )
        };
      case CARRIER_EDIT_FETCHING:
        return {
          ...state,
          edit: {
            ...state.edit,
            isEditing: true,
            isEditingFail: false
          }
        };
      case CARRIER_EDIT_OK:
        return {
          ...state,
          edit: {
            ...state.edit,
            isEditing: false,
            isEditingFail: false
          }
        };
      case CARRIER_EDIT_FAIL:
        return {
          ...state,
          edit: {
            ...state.edit,
            isEditing: false,
            isEditingFail: true
          }
        };
      case CARRIER_SORTING:
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
  