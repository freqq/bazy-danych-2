import {
  fetchOrders,
  fetchOrderById,
  removeOrderById,
  addOrder,
  editOrderById,
  fetchClients,
  fetchFlights,
  fetchTickets
} from "dashboard/subpages/handlers/ordersHandlers";
import { push } from "react-router-redux";

export const ORDERS_FETCHING = "ORDERS_FETCHING";
export const ORDERS_OK = "ORDERS_OK";
export const ORDERS_FAIL = "ORDERS_FAIL";
export const ORDER_REMOVE_FETCHING = "ORDER_REMOVE_FETCHING";
export const ORDER_REMOVE_OK = "ORDER_REMOVE_OK";
export const ORDER_REMOVE_FAIL = "ORDER_REMOVE_FAIL";
export const ORDER_ADD_FETCHING = "ORDER_ADD_FETCHING";
export const ORDER_ADD_OK = "ORDER_ADD_OK";
export const ORDER_ADD_FAIL = "ORDER_ADD_FAIL";
export const ORDER_SEARCHING = "ORDER_SEARCHING";
export const ORDER_SORTING = "ORDER_SORTING";
export const ORDER_GET_FETCHING = "ORDER_GET_FETCHING";
export const ORDER_GET_FAIL = "ORDER_GET_FAIL";
export const ORDER_GET_OK = "ORDER_GET_OK";
export const ORDER_EDIT_FETCHING = "ORDER_EDIT_FETCHING";
export const ORDER_EDIT_FAIL = "ORDER_EDIT_FAIL";
export const ORDER_EDIT_OK = "ORDER_EDIT_OK";

export const FLIGHTS_FETCH_FETCHING = "FLIGHTS_FETCH_FETCHING";
export const FLIGHTS_FETCH_FAIL = "FLIGHTS_FETCH_FAIL";
export const FLIGHTS_FETCH_OK = "FLIGHTS_FETCH_OK";
export const CLIENTS_FETCH_FETCHING = "CLIENTS_FETCH_FETCHING";
export const CLIENTS_FETCH_FAIL = "CLIENTS_FETCH_FAIL";
export const CLIENTS_FETCH_OK = "CLIENTS_FETCH_OK";
export const TICKETS_FETCH_FETCHING = "TICKETS_FETCH_FETCHING";
export const TICKETS_FETCH_FAIL = "TICKETS_FETCH_FAIL";
export const TICKETS_FETCH_OK = "TICKETS_FETCH_OK";

export const makeOrdersFetching = () => ({
  type: ORDERS_FETCHING
});

export const makeOrdersOk = data => ({
  type: ORDERS_OK,
  payload: data
});

export const makeOrdersFail = () => ({
  type: ORDERS_FAIL
});

export const makeFetchFlightsFetching = () => ({
  type: FLIGHTS_FETCH_FETCHING
});

export const makeFetchFlightsOk = data => ({
  type: FLIGHTS_FETCH_OK,
  payload: data
});

export const makeFetchFlightsFail = () => ({
  type: FLIGHTS_FETCH_FAIL
});

export const makeFetchClientsFetching = () => ({
  type: CLIENTS_FETCH_FETCHING
});

export const makeFetchClientsOk = data => ({
  type: CLIENTS_FETCH_OK,
  payload: data
});

export const makeFetchClientsFail = () => ({
  type: CLIENTS_FETCH_FAIL
});

export const makeFetchTicketsFetching = () => ({
  type: TICKETS_FETCH_FETCHING
});

export const makeFetchTicketsOk = data => ({
  type: TICKETS_FETCH_OK,
  payload: data
});

export const makeFetchTicketsFail = () => ({
  type: TICKETS_FETCH_FAIL
});

export const makeOrderEditFetching = () => ({
  type: ORDER_EDIT_FETCHING
});

export const makeOrderEditOk = () => ({
  type: ORDER_EDIT_OK
});

export const makeOrderEditFail = () => ({
  type: ORDER_EDIT_FAIL
});

export const makeOrdersRemoveFetching = () => ({
  type: ORDER_REMOVE_FETCHING
});

export const makeOrdersRemoveOk = () => ({
  type: ORDER_REMOVE_OK
});

export const makeOrdersRemoveFail = () => ({
  type: ORDER_REMOVE_FAIL
});

export const makeOrdersAddFetching = () => ({
  type: ORDER_ADD_FETCHING
});

export const makeOrdersAddOk = () => ({
  type: ORDER_ADD_OK
});

export const makeOrdersAddFail = () => ({
  type: ORDER_ADD_FAIL
});

export const makeOrderGetFetching = () => ({
  type: ORDER_GET_FETCHING
});

export const makeOrderGetOk = data => ({
  type: ORDER_GET_OK,
  payload: data.parameterWithTypeList
});

export const makeOrderGetFail = () => ({
  type: ORDER_GET_FAIL
});

export const makeSearching = data => ({
  type: ORDER_SEARCHING,
  payload: data
});

export const makeSorting = data => ({
  type: ORDER_SORTING,
  payload: data
});

const getOrdersFunction = dispatch => {
  dispatch(makeOrdersFetching());

  return fetchOrders()
    .then(res => {
      dispatch(makeOrdersOk(res.data));
    })
    .catch(() => {
      dispatch(makeOrdersFail());
    });
};

const orderAddFunction = (orderData, dispatch) => {
  dispatch(makeOrdersAddFetching());

  return addOrder(orderData)
    .then(() => {
      setTimeout(() => {
        dispatch(makeOrdersAddOk());
        getOrdersFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makeOrdersAddFail());
    });
};

const orderEditFunction = (orderId, orderData, dispatch) => {
  dispatch(makeOrderEditFetching());

  return editOrderById(orderId, orderData)
    .then(() => {
      dispatch(makeOrderEditOk());
      dispatch(push("/admin/orders"));
    })
    .catch(() => {
      dispatch(makeOrderEditFail());
    });
};

const orderRemoveFunction = (orderId, dispatch) => {
  dispatch(makeOrdersRemoveFetching());

  return removeOrderById(orderId)
    .then(() => {
      setTimeout(() => {
        dispatch(makeOrdersRemoveOk());
        getOrdersFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makeOrdersRemoveFail());
    });
};

const orderSearchFunction = (searchData, dispatch) => {
  dispatch(makeSearching(searchData));
};

const ordersSortFunction = (headerName, dispatch) => {
  dispatch(makeSorting(headerName));
};

const getOrderByIfFunction = (orderId, dispatch) => {
  dispatch(makeOrderGetFetching());

  return fetchOrderById(orderId)
    .then(res => {
      dispatch(makeOrderGetOk(res.data));
    })
    .catch(() => {
      dispatch(makeOrderGetFail());
    });
};

const ticketsFetchFunction = dispatch => {
  dispatch(makeFetchTicketsFetching());

  return fetchTickets()
    .then(res => {
      dispatch(makeFetchTicketsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchTicketsFail());
    });
};

const flightsFetchFunction = dispatch => {
  dispatch(makeFetchFlightsFetching());

  return fetchFlights()
    .then(res => {
      dispatch(makeFetchFlightsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchFlightsFail());
    });
};

const clientsFetchFunction = dispatch => {
  dispatch(makeFetchClientsFetching());

  return fetchClients()
    .then(res => {
      dispatch(makeFetchClientsOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchClientsFail());
    });
};

export const ordersGet = () => dispatch => getOrdersFunction(dispatch);
export const orderById = orderId => dispatch =>
  getOrderByIfFunction(orderId, dispatch);
export const orderAdd = orderData => dispatch =>
  orderAddFunction(orderData, dispatch);
export const orderEdit = (orderId, orderData) => dispatch =>
  orderEditFunction(orderId, orderData, dispatch);
export const orderRemove = orderId => dispatch =>
  orderRemoveFunction(orderId, dispatch);
export const orderSearch = searchData => dispatch =>
  orderSearchFunction(searchData, dispatch);
export const ordersSort = headerName => dispatch =>
  ordersSortFunction(headerName, dispatch);
export const ticketsFetch = () => dispatch => ticketsFetchFunction(dispatch);
export const flightsFetch = () => dispatch => flightsFetchFunction(dispatch);
export const clientsFetch = () => dispatch => clientsFetchFunction(dispatch);
