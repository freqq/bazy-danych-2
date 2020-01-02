import {
  fetchPlanes,
  fetchPlaneById,
  removePlaneById,
  addPlane,
  editPlaneById
} from "dashboard/subpages/handlers/planesHandlers";
import { push } from "react-router-redux";

export const PLANES_FETCHING = "PLANES_FETCHING";
export const PLANES_OK = "PLANES_OK";
export const PLANES_FAIL = "PLANES_FAIL";
export const PLANE_REMOVE_FETCHING = "PLANE_REMOVE_FETCHING";
export const PLANE_REMOVE_OK = "PLANE_REMOVE_OK";
export const PLANE_REMOVE_FAIL = "PLANE_REMOVE_FAIL";
export const PLANE_ADD_FETCHING = "PLANE_ADD_FETCHING";
export const PLANE_ADD_OK = "PLANE_ADD_OK";
export const PLANE_ADD_FAIL = "PLANE_ADD_FAIL";
export const PLANE_SEARCHING = "PLANE_SEARCHING";
export const PLANE_SORTING = "PLANE_SORTING";
export const PLANE_GET_FETCHING = "PLANE_GET_FETCHING";
export const PLANE_GET_FAIL = "PLANE_GET_FAIL";
export const PLANE_GET_OK = "PLANE_GET_OK";
export const PLANE_EDIT_FETCHING = "PLANE_EDIT_FETCHING";
export const PLANE_EDIT_FAIL = "PLANE_EDIT_FAIL";
export const PLANE_EDIT_OK = "PLANE_EDIT_OK";

export const makePlanesFetching = () => ({
  type: PLANES_FETCHING
});

export const makePlanesOk = data => ({
  type: PLANES_OK,
  payload: data
});

export const makePlanesFail = () => ({
  type: PLANES_FAIL
});

export const makePlaneEditFetching = () => ({
  type: PLANE_EDIT_FETCHING
});

export const makePlaneEditOk = () => ({
  type: PLANE_EDIT_OK
});

export const makePlaneEditFail = () => ({
  type: PLANE_EDIT_FAIL
});

export const makePlanesRemoveFetching = () => ({
  type: PLANE_REMOVE_FETCHING
});

export const makePlanesRemoveOk = () => ({
  type: PLANE_REMOVE_OK
});

export const makePlanesRemoveFail = () => ({
  type: PLANE_REMOVE_FAIL
});

export const makePlanesAddFetching = () => ({
  type: PLANE_ADD_FETCHING
});

export const makePlanesAddOk = () => ({
  type: PLANE_ADD_OK
});

export const makePlanesAddFail = () => ({
  type: PLANE_ADD_FAIL
});

export const makePlaneGetFetching = () => ({
  type: PLANE_GET_FETCHING
});

export const makePlaneGetOk = data => ({
  type: PLANE_GET_OK,
  payload: data.parameterWithTypeList
});

export const makePlaneGetFail = () => ({
  type: PLANE_GET_FAIL
});

export const makeSearching = data => ({
  type: PLANE_SEARCHING,
  payload: data
});

export const makeSorting = data => ({
  type: PLANE_SORTING,
  payload: data
});

const getPlanesFunction = dispatch => {
  dispatch(makePlanesFetching());

  return fetchPlanes()
    .then(res => {
      dispatch(makePlanesOk(res.data));
    })
    .catch(() => {
      dispatch(makePlanesFail());
    });
};

const planeAddFunction = (planeData, dispatch) => {
  dispatch(makePlanesAddFetching());

  return addPlane(planeData)
    .then(() => {
      setTimeout(() => {
        dispatch(makePlanesAddOk());
        getPlanesFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makePlanesAddFail());
    });
};

const planeEditFunction = (planeId, planeData, dispatch) => {
  dispatch(makePlaneEditFetching());

  return editPlaneById(planeId, planeData)
    .then(() => {
      dispatch(makePlaneEditOk());
      dispatch(push("/admin/planes"));
    })
    .catch(() => {
      dispatch(makePlaneEditFail());
    });
};

const planeRemoveFunction = (planeId, dispatch) => {
  dispatch(makePlanesRemoveFetching());

  return removePlaneById(planeId)
    .then(() => {
      setTimeout(() => {
        dispatch(makePlanesRemoveOk());
        getPlanesFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makePlanesRemoveFail());
    });
};

const planeSearchFunction = (searchData, dispatch) => {
  dispatch(makeSearching(searchData));
};

const planesSortFunction = (headerName, dispatch) => {
  dispatch(makeSorting(headerName));
};

const getPlaneByIfFunction = (planeId, dispatch) => {
  dispatch(makePlaneGetFetching());

  return fetchPlaneById(planeId)
    .then(res => {
      dispatch(makePlaneGetOk(res.data));
    })
    .catch(() => {
      dispatch(makePlaneGetFail());
    });
};

export const planesGet = () => dispatch => getPlanesFunction(dispatch);
export const planeById = planeId => dispatch =>
  getPlaneByIfFunction(planeId, dispatch);
export const planeAdd = planeData => dispatch =>
  planeAddFunction(planeData, dispatch);
export const planeEdit = (planeId, planeData) => dispatch =>
  planeEditFunction(planeId, planeData, dispatch);
export const planeRemove = planeId => dispatch =>
  planeRemoveFunction(planeId, dispatch);
export const planeSearch = searchData => dispatch =>
  planeSearchFunction(searchData, dispatch);
export const planesSort = headerName => dispatch =>
  planesSortFunction(headerName, dispatch);
