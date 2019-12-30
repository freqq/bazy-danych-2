import {
  fetchPlanes,
  removePlaneById,
  addPlane
} from "dashboard/subpages/handlers/planesHandlers";

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

export const makeSearching = data => ({
  type: PLANE_SEARCHING,
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

const planeEditFunction = (planeData, dispatch) => {};

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

export const planesGet = () => dispatch => getPlanesFunction(dispatch);
export const planeAdd = planeData => dispatch =>
  planeAddFunction(planeData, dispatch);
export const planeEdit = planeData => dispatch =>
  planeEditFunction(planeData, dispatch);
export const planeRemove = planeId => dispatch =>
  planeRemoveFunction(planeId, dispatch);
export const planeSearch = searchData => dispatch =>
  planeSearchFunction(searchData, dispatch);
