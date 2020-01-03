import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchTickets = () =>
  RequestService.get(`${API_BASE_URL}/tickets/`);
export const fetchTicketById = ticketId =>
  RequestService.get(`${API_BASE_URL}/tickets/${ticketId}`);
export const editTicketById = (ticketId, ticketData) =>
  RequestService.post(`${API_BASE_URL}/tickets/${ticketId}`, ticketData);
export const removeTicketById = ticketId =>
  RequestService.post(`${API_BASE_URL}/tickets/remove/${ticketId}`);
export const addTicket = ticketData =>
  RequestService.post(`${API_BASE_URL}/tickets/`, ticketData);
