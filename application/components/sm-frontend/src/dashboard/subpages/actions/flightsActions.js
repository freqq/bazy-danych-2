import {
  fetchFlights,
  fetchFlightById,
  removeFlightById,
  addFlight,
  editFlightById,
  fetchCarrierNames,
  fetchPlanesNames
} from "dashboard/subpages/handlers/flightsHandlers";
import { push } from "react-router-redux";

export const FLIGHTS_FETCHING = "FLIGHTS_FETCHING";
export const FLIGHTS_OK = "FLIGHTS_OK";
export const FLIGHTS_FAIL = "FLIGHTS_FAIL";
export const FLIGHT_REMOVE_FETCHING = "FLIGHT_REMOVE_FETCHING";
export const FLIGHT_REMOVE_OK = "FLIGHT_REMOVE_OK";
export const FLIGHT_REMOVE_FAIL = "FLIGHT_REMOVE_FAIL";
export const FLIGHT_ADD_FETCHING = "FLIGHT_ADD_FETCHING";
export const FLIGHT_ADD_OK = "FLIGHT_ADD_OK";
export const FLIGHT_ADD_FAIL = "FLIGHT_ADD_FAIL";
export const FLIGHT_SEARCHING = "FLIGHT_SEARCHING";
export const FLIGHT_SORTING = "FLIGHT_SORTING";
export const FLIGHT_GET_FETCHING = "FLIGHT_GET_FETCHING";
export const FLIGHT_GET_FAIL = "FLIGHT_GET_FAIL";
export const FLIGHT_GET_OK = "FLIGHT_GET_OK";
export const FLIGHT_EDIT_FETCHING = "FLIGHT_EDIT_FETCHING";
export const FLIGHT_EDIT_FAIL = "FLIGHT_EDIT_FAIL";
export const FLIGHT_EDIT_OK = "FLIGHT_EDIT_OK";
export const CARRIERS_NAMES_FETCHING = "CARRIERS_NAMES_FETCHING";
export const CARRIERS_NAMES_FAIL = "CARRIERS_NAMES_FAIL";
export const CARRIERS_NAMES_OK = "CARRIERS_NAMES_OK";
export const PLANES_NAMES_FETCHING = "PLANES_NAMES_FETCHING";
export const PLANES_NAMES_FAIL = "PLANES_NAMES_FAIL";
export const PLANES_NAMES_OK = "PLANES_NAMES_OK";

export const makeFlightsFetching = () => ({
  type: FLIGHTS_FETCHING
});

export const makeFlightsOk = data => ({
  type: FLIGHTS_OK,
  payload: data
});

export const makeFlightsFail = () => ({
  type: FLIGHTS_FAIL
});

export const makePlanesNamesFetching = () => ({
  type: PLANES_NAMES_FETCHING
});

export const makePlanesNamesOk = data => ({
  type: PLANES_NAMES_OK,
  payload: data
});

export const makePlanesNamesFail = () => ({
  type: PLANES_NAMES_FAIL
});

export const makeCarriersNamesFetching = () => ({
  type: CARRIERS_NAMES_FETCHING
});

export const makeCarriersNamesOk = data => ({
  type: CARRIERS_NAMES_OK,
  payload: data
});

export const makeCarriersNamesFail = () => ({
  type: CARRIERS_NAMES_FAIL
});

export const makeFlightEditFetching = () => ({
  type: FLIGHT_EDIT_FETCHING
});

export const makeFlightEditOk = () => ({
  type: FLIGHT_EDIT_OK
});

export const makeFlightEditFail = () => ({
  type: FLIGHT_EDIT_FAIL
});

export const makeFlightsRemoveFetching = () => ({
  type: FLIGHT_REMOVE_FETCHING
});

export const makeFlightsRemoveOk = () => ({
  type: FLIGHT_REMOVE_OK
});

export const makeFlightsRemoveFail = () => ({
  type: FLIGHT_REMOVE_FAIL
});

export const makeFlightsAddFetching = () => ({
  type: FLIGHT_ADD_FETCHING
});

export const makeFlightsAddOk = () => ({
  type: FLIGHT_ADD_OK
});

export const makeFlightsAddFail = () => ({
  type: FLIGHT_ADD_FAIL
});

export const makeFlightGetFetching = () => ({
  type: FLIGHT_GET_FETCHING
});

export const makeFlightGetOk = data => ({
  type: FLIGHT_GET_OK,
  payload: data.parameterWithTypeList
});

export const makeFlightGetFail = () => ({
  type: FLIGHT_GET_FAIL
});

export const makeSearching = data => ({
  type: FLIGHT_SEARCHING,
  payload: data
});

export const makeSorting = data => ({
  type: FLIGHT_SORTING,
  payload: data
});

const getFlightsFunction = dispatch => {
  dispatch(makeFlightsFetching());

  return fetchFlights()
    .then(res => {
      dispatch(makeFlightsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFlightsFail());
    });
};

const flightAddFunction = (flightData, dispatch) => {
  dispatch(makeFlightsAddFetching());

  return addFlight(flightData)
    .then(() => {
      setTimeout(() => {
        dispatch(makeFlightsAddOk());
        getFlightsFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makeFlightsAddFail());
    });
};

const flightEditFunction = (flightId, flightData, dispatch) => {
  dispatch(makeFlightEditFetching());

  return editFlightById(flightId, flightData)
    .then(() => {
      dispatch(makeFlightEditOk());
      dispatch(push("/admin/flights"));
    })
    .catch(() => {
      dispatch(makeFlightEditFail());
    });
};

const flightRemoveFunction = (flightId, dispatch) => {
  dispatch(makeFlightsRemoveFetching());

  return removeFlightById(flightId)
    .then(() => {
      setTimeout(() => {
        dispatch(makeFlightsRemoveOk());
        getFlightsFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makeFlightsRemoveFail());
    });
};

const flightSearchFunction = (searchData, dispatch) => {
  dispatch(makeSearching(searchData));
};

const flightsSortFunction = (headerName, dispatch) => {
  dispatch(makeSorting(headerName));
};

const getFlightByIfFunction = (flightId, dispatch) => {
  dispatch(makeFlightGetFetching());

  return fetchFlightById(flightId)
    .then(res => {
      dispatch(makeFlightGetOk(res.data));
    })
    .catch(() => {
      dispatch(makeFlightGetFail());
    });
};

const carrierNamesGetFunction = dispatch => {
  dispatch(makeCarriersNamesFetching());

  return fetchCarrierNames()
    .then(res => {
      dispatch(makeCarriersNamesOk(res.data));
    })
    .catch(() => {
      dispatch(makeCarriersNamesFail());
    });
};

const planesNamesGetFunction = dispatch => {
  dispatch(makePlanesNamesFetching());

  return fetchPlanesNames()
    .then(res => {
      dispatch(makePlanesNamesOk(res.data));
    })
    .catch(() => {
      dispatch(makePlanesNamesFail());
    });
};

export const carrierNamesGet = () => dispatch =>
  carrierNamesGetFunction(dispatch);
export const planesNamesGet = () => dispatch =>
  planesNamesGetFunction(dispatch);
export const flightsGet = () => dispatch => getFlightsFunction(dispatch);
export const flightById = flightId => dispatch =>
  getFlightByIfFunction(flightId, dispatch);
export const flightAdd = flightData => dispatch =>
  flightAddFunction(flightData, dispatch);
export const flightEdit = (flightId, flightData) => dispatch =>
  flightEditFunction(flightId, flightData, dispatch);
export const flightRemove = flightId => dispatch =>
  flightRemoveFunction(flightId, dispatch);
export const flightSearch = searchData => dispatch =>
  flightSearchFunction(searchData, dispatch);
export const flightsSort = headerName => dispatch =>
  flightsSortFunction(headerName, dispatch);
