import RequestService from "common/services/RequestService";

export const fetchTickets = () =>
  RequestService.get("http://localhost:5000/api/v1/tickets/");
export const fetchTicketById = ticketId =>
  RequestService.get(`http://localhost:5000/api/v1/tickets/${ticketId}`);
export const editTicketById = (ticketId, ticketData) =>
  RequestService.post(
    `http://localhost:5000/api/v1/tickets/${ticketId}`,
    ticketData
  );
export const removeTicketById = ticketId =>
  RequestService.post(`http://localhost:5000/api/v1/tickets/remove/${ticketId}`);
export const addTicket = ticketData =>
  RequestService.post(`http://localhost:5000/api/v1/tickets/`, ticketData);
