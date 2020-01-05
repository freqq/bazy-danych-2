import {
  fetchValuableOrders,
  fetchPlanes,
  fetchBigPlanesData
} from "dashboard/subpages/handlers/dashboardHandlers";

export const VALUABLE_ORDERS_FETCHING = "VALUABLE_ORDERS_FETCHING";
export const VALUABLE_ORDERS_OK = "VALUABLE_ORDERS_OK";
export const VALUABLE_ORDERS_FAIL = "VALUABLE_ORDERS_FAIL";
export const PLANES_CHART_FETCHING = "PLANES_CHART_FETCHING";
export const PLANES_CHART_FAIL = "PLANES_CHART_FAIL";
export const PLANES_CHART_OK = "PLANES_CHART_OK";
export const PLANES_BIG_CHART_FETCHING = "PLANES_BIG_CHART_FETCHING";
export const PLANES_BIG_CHART_FAIL = "PLANES_BIG_CHART_FAIL";
export const PLANES_BIG_CHART_OK = "PLANES_BIG_CHART_OK";

export const makeOrdersFetching = () => ({
  type: VALUABLE_ORDERS_FETCHING
});

export const makeOrdersOk = data => ({
  type: VALUABLE_ORDERS_OK,
  payload: data
});

export const makeOrdersFail = () => ({
  type: VALUABLE_ORDERS_FAIL
});

export const makePlanesChartFetching = () => ({
  type: PLANES_CHART_FETCHING
});

export const makePlanesChartOk = data => ({
  type: PLANES_CHART_OK,
  payload: data
});

export const makePlanesChartFail = () => ({
  type: PLANES_CHART_FAIL
});

export const makePlanesBigChartFetching = () => ({
  type: PLANES_BIG_CHART_FETCHING
});

export const makePlanesBigChartOk = data => ({
  type: PLANES_BIG_CHART_OK,
  payload: data
});

export const makePlanesBigChartFail = () => ({
  type: PLANES_BIG_CHART_FAIL
});

const fetchOrdersDataFunction = dispatch => {
  dispatch(makeOrdersFetching());

  return fetchValuableOrders()
    .then(res => {
      dispatch(makeOrdersOk(res.data));
    })
    .catch(() => {
      dispatch(makeOrdersFail());
    });
};

const fetchPlanesWithLargerstNumberOfFlightsFunction = dispatch => {
  dispatch(makePlanesChartFetching());

  return fetchPlanes()
    .then(res => {
      dispatch(makePlanesChartOk(res.data));
    })
    .catch(() => {
      dispatch(makePlanesChartFail());
    });
};

const fetchPlanesBigFunction = dispatch => {
  dispatch(makePlanesBigChartFetching());

  return fetchBigPlanesData()
    .then(res => {
      dispatch(makePlanesBigChartOk(res.data));
    })
    .catch(() => {
      dispatch(makePlanesBigChartFail());
    });
};

export const fetchOrdersData = () => dispatch =>
  fetchOrdersDataFunction(dispatch);
export const fetchPlanesWithLargerstNumberOfFlights = () => dispatch =>
  fetchPlanesWithLargerstNumberOfFlightsFunction(dispatch);
export const fetchPlanesBig = () => dispatch =>
  fetchPlanesBigFunction(dispatch);
