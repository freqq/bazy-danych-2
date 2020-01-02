import {
    fetchTickets,
    fetchTicketById,
    removeTicketById,
    addTicket,
    editTicketById
  } from "dashboard/subpages/handlers/ticketsHandlers";
  import { push } from "react-router-redux";
  
  export const TICKETS_FETCHING = "TICKETS_FETCHING";
  export const TICKETS_OK = "TICKETS_OK";
  export const TICKETS_FAIL = "TICKETS_FAIL";
  export const TICKET_REMOVE_FETCHING = "TICKET_REMOVE_FETCHING";
  export const TICKET_REMOVE_OK = "TICKET_REMOVE_OK";
  export const TICKET_REMOVE_FAIL = "TICKET_REMOVE_FAIL";
  export const TICKET_ADD_FETCHING = "TICKET_ADD_FETCHING";
  export const TICKET_ADD_OK = "TICKET_ADD_OK";
  export const TICKET_ADD_FAIL = "TICKET_ADD_FAIL";
  export const TICKET_SEARCHING = "TICKET_SEARCHING";
  export const TICKET_SORTING = "TICKET_SORTING";
  export const TICKET_GET_FETCHING = "TICKET_GET_FETCHING";
  export const TICKET_GET_FAIL = "TICKET_GET_FAIL";
  export const TICKET_GET_OK = "TICKET_GET_OK";
  export const TICKET_EDIT_FETCHING = "TICKET_EDIT_FETCHING";
  export const TICKET_EDIT_FAIL = "TICKET_EDIT_FAIL";
  export const TICKET_EDIT_OK = "TICKET_EDIT_OK";
  
  export const makeTicketsFetching = () => ({
    type: TICKETS_FETCHING
  });
  
  export const makeTicketsOk = data => ({
    type: TICKETS_OK,
    payload: data
  });
  
  export const makeTicketsFail = () => ({
    type: TICKETS_FAIL
  });
  
  export const makeTicketEditFetching = () => ({
    type: TICKET_EDIT_FETCHING
  });
  
  export const makeTicketEditOk = () => ({
    type: TICKET_EDIT_OK
  });
  
  export const makeTicketEditFail = () => ({
    type: TICKET_EDIT_FAIL
  });
  
  export const makeTicketsRemoveFetching = () => ({
    type: TICKET_REMOVE_FETCHING
  });
  
  export const makeTicketsRemoveOk = () => ({
    type: TICKET_REMOVE_OK
  });
  
  export const makeTicketsRemoveFail = () => ({
    type: TICKET_REMOVE_FAIL
  });
  
  export const makeTicketsAddFetching = () => ({
    type: TICKET_ADD_FETCHING
  });
  
  export const makeTicketsAddOk = () => ({
    type: TICKET_ADD_OK
  });
  
  export const makeTicketsAddFail = () => ({
    type: TICKET_ADD_FAIL
  });
  
  export const makeTicketGetFetching = () => ({
    type: TICKET_GET_FETCHING
  });
  
  export const makeTicketGetOk = data => ({
    type: TICKET_GET_OK,
    payload: data.parameterWithTypeList
  });
  
  export const makeTicketGetFail = () => ({
    type: TICKET_GET_FAIL
  });
  
  export const makeSearching = data => ({
    type: TICKET_SEARCHING,
    payload: data
  });
  
  export const makeSorting = data => ({
    type: TICKET_SORTING,
    payload: data
  });
  
  const getTicketsFunction = dispatch => {
    dispatch(makeTicketsFetching());
  
    return fetchTickets()
      .then(res => {
        dispatch(makeTicketsOk(res.data));
      })
      .catch(() => {
        dispatch(makeTicketsFail());
      });
  };
  
  const ticketAddFunction = (ticketData, dispatch) => {
    dispatch(makeTicketsAddFetching());
  
    return addTicket(ticketData)
      .then(() => {
        setTimeout(() => {
          dispatch(makeTicketsAddOk());
          getTicketsFunction(dispatch);
        }, 2000);
      })
      .catch(() => {
        dispatch(makeTicketsAddFail());
      });
  };
  
  const ticketEditFunction = (ticketId, ticketData, dispatch) => {
    dispatch(makeTicketEditFetching());
  
    return editTicketById(ticketId, ticketData)
      .then(() => {
        dispatch(makeTicketEditOk());
        dispatch(push("/admin/tickets"));
      })
      .catch(() => {
        dispatch(makeTicketEditFail());
      });
  };
  
  const ticketRemoveFunction = (ticketId, dispatch) => {
    dispatch(makeTicketsRemoveFetching());
  
    return removeTicketById(ticketId)
      .then(() => {
        setTimeout(() => {
          dispatch(makeTicketsRemoveOk());
          getTicketsFunction(dispatch);
        }, 2000);
      })
      .catch(() => {
        dispatch(makeTicketsRemoveFail());
      });
  };
  
  const ticketSearchFunction = (searchData, dispatch) => {
    dispatch(makeSearching(searchData));
  };
  
  const ticketsSortFunction = (headerName, dispatch) => {
    dispatch(makeSorting(headerName));
  };
  
  const getTicketByIfFunction = (ticketId, dispatch) => {
    dispatch(makeTicketGetFetching());
  
    return fetchTicketById(ticketId)
      .then(res => {
        dispatch(makeTicketGetOk(res.data));
      })
      .catch(() => {
        dispatch(makeTicketGetFail());
      });
  };
  
  export const ticketsGet = () => dispatch => getTicketsFunction(dispatch);
  export const ticketById = ticketId => dispatch =>
    getTicketByIfFunction(ticketId, dispatch);
  export const ticketAdd = ticketData => dispatch =>
    ticketAddFunction(ticketData, dispatch);
  export const ticketEdit = (ticketId, ticketData) => dispatch =>
    ticketEditFunction(ticketId, ticketData, dispatch);
  export const ticketRemove = ticketId => dispatch =>
    ticketRemoveFunction(ticketId, dispatch);
  export const ticketSearch = searchData => dispatch =>
    ticketSearchFunction(searchData, dispatch);
  export const ticketsSort = headerName => dispatch =>
    ticketsSortFunction(headerName, dispatch);
  