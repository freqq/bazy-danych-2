import {
  fetchClients,
  fetchClientById,
  removeClientById,
  addClient,
  editClientById
} from "dashboard/subpages/handlers/clientsHandlers";
import { push } from "react-router-redux";

export const CLIENTS_FETCHING = "CLIENTS_FETCHING";
export const CLIENTS_OK = "CLIENTS_OK";
export const CLIENTS_FAIL = "CLIENTS_FAIL";
export const CLIENT_REMOVE_FETCHING = "CLIENT_REMOVE_FETCHING";
export const CLIENT_REMOVE_OK = "CLIENT_REMOVE_OK";
export const CLIENT_REMOVE_FAIL = "CLIENT_REMOVE_FAIL";
export const CLIENT_ADD_FETCHING = "CLIENT_ADD_FETCHING";
export const CLIENT_ADD_OK = "CLIENT_ADD_OK";
export const CLIENT_ADD_FAIL = "CLIENT_ADD_FAIL";
export const CLIENT_SEARCHING = "CLIENT_SEARCHING";
export const CLIENT_SORTING = "CLIENT_SORTING";
export const CLIENT_GET_FETCHING = "CLIENT_GET_FETCHING";
export const CLIENT_GET_FAIL = "CLIENT_GET_FAIL";
export const CLIENT_GET_OK = "CLIENT_GET_OK";
export const CLIENT_EDIT_FETCHING = "CLIENT_EDIT_FETCHING";
export const CLIENT_EDIT_FAIL = "CLIENT_EDIT_FAIL";
export const CLIENT_EDIT_OK = "CLIENT_EDIT_OK";

export const makeClientsFetching = () => ({
  type: CLIENTS_FETCHING
});

export const makeClientsOk = data => ({
  type: CLIENTS_OK,
  payload: data
});

export const makeClientsFail = () => ({
  type: CLIENTS_FAIL
});

export const makeClientEditFetching = () => ({
  type: CLIENT_EDIT_FETCHING
});

export const makeClientEditOk = () => ({
  type: CLIENT_EDIT_OK
});

export const makeClientEditFail = () => ({
  type: CLIENT_EDIT_FAIL
});

export const makeClientsRemoveFetching = () => ({
  type: CLIENT_REMOVE_FETCHING
});

export const makeClientsRemoveOk = () => ({
  type: CLIENT_REMOVE_OK
});

export const makeClientsRemoveFail = () => ({
  type: CLIENT_REMOVE_FAIL
});

export const makeClientsAddFetching = () => ({
  type: CLIENT_ADD_FETCHING
});

export const makeClientsAddOk = () => ({
  type: CLIENT_ADD_OK
});

export const makeClientsAddFail = () => ({
  type: CLIENT_ADD_FAIL
});

export const makeClientGetFetching = () => ({
  type: CLIENT_GET_FETCHING
});

export const makeClientGetOk = data => ({
  type: CLIENT_GET_OK,
  payload: data.parameterWithTypeList
});

export const makeClientGetFail = () => ({
  type: CLIENT_GET_FAIL
});

export const makeSearching = data => ({
  type: CLIENT_SEARCHING,
  payload: data
});

export const makeSorting = data => ({
  type: CLIENT_SORTING,
  payload: data
});

const getClientsFunction = dispatch => {
  dispatch(makeClientsFetching());

  return fetchClients()
    .then(res => {
      dispatch(makeClientsOk(res.data));
    })
    .catch(() => {
      dispatch(makeClientsFail());
    });
};

const clientAddFunction = (clientData, dispatch) => {
  dispatch(makeClientsAddFetching());

  return addClient(clientData)
    .then(() => {
      setTimeout(() => {
        dispatch(makeClientsAddOk());
        getClientsFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makeClientsAddFail());
    });
};

const clientEditFunction = (clientId, clientData, dispatch) => {
  dispatch(makeClientEditFetching());

  return editClientById(clientId, clientData)
    .then(() => {
      dispatch(makeClientEditOk());
      dispatch(push("/admin/clients"));
    })
    .catch(() => {
      dispatch(makeClientEditFail());
    });
};

const clientRemoveFunction = (clientId, dispatch) => {
  dispatch(makeClientsRemoveFetching());

  return removeClientById(clientId)
    .then(() => {
      setTimeout(() => {
        dispatch(makeClientsRemoveOk());
        getClientsFunction(dispatch);
      }, 2000);
    })
    .catch(() => {
      dispatch(makeClientsRemoveFail());
    });
};

const clientSearchFunction = (searchData, dispatch) => {
  dispatch(makeSearching(searchData));
};

const clientsSortFunction = (headerName, dispatch) => {
  dispatch(makeSorting(headerName));
};

const getClientByIfFunction = (clientId, dispatch) => {
  dispatch(makeClientGetFetching());

  return fetchClientById(clientId)
    .then(res => {
      dispatch(makeClientGetOk(res.data));
    })
    .catch(() => {
      dispatch(makeClientGetFail());
    });
};

export const clientsGet = () => dispatch => getClientsFunction(dispatch);
export const clientById = clientId => dispatch =>
  getClientByIfFunction(clientId, dispatch);
export const clientAdd = clientData => dispatch =>
  clientAddFunction(clientData, dispatch);
export const clientEdit = (clientId, clientData) => dispatch =>
  clientEditFunction(clientId, clientData, dispatch);
export const clientRemove = clientId => dispatch =>
  clientRemoveFunction(clientId, dispatch);
export const clientSearch = searchData => dispatch =>
  clientSearchFunction(searchData, dispatch);
export const clientsSort = headerName => dispatch =>
  clientsSortFunction(headerName, dispatch);
