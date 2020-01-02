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
  PLANE_SEARCHING,
  PLANE_SORTING,
  PLANE_GET_FETCHING,
  PLANE_GET_FAIL,
  PLANE_GET_OK,
  PLANE_EDIT_FETCHING,
  PLANE_EDIT_FAIL,
  PLANE_EDIT_OK
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
    case PLANE_GET_OK:
      return {
        ...state,
        edit: {
          data: payload,
          isFetching: false,
          isError: false
        }
      };
    case PLANE_GET_FETCHING:
      return {
        ...state,
        edit: {
          data: [],
          isFetching: true,
          isError: false
        }
      };
    case PLANE_GET_FAIL:
      return {
        ...state,
        edit: {
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
    case PLANE_EDIT_FETCHING:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: true,
          isEditingFail: false
        }
      };
    case PLANE_EDIT_OK:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: false
        }
      };
    case PLANE_EDIT_FAIL:
      return {
        ...state,
        edit: {
          ...state.edit,
          isEditing: false,
          isEditingFail: true
        }
      };
    case PLANE_SORTING:
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
