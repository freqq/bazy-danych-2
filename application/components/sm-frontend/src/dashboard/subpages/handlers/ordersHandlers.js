import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchOrders = () =>
  RequestService.get(`${API_BASE_URL}/orders/`);
export const fetchClients = () =>
  RequestService.get(`${API_BASE_URL}/clients/names`);
export const fetchFlights = () =>
  RequestService.get(`${API_BASE_URL}/flights/names`);
export const fetchTickets = () =>
  RequestService.get(`${API_BASE_URL}/tickets/names`);
export const fetchOrderById = orderId =>
  RequestService.get(`${API_BASE_URL}/orders/${orderId}`);
export const editOrderById = (orderId, orderData) =>
  RequestService.post(`${API_BASE_URL}/orders/${orderId}`, orderData);
export const removeOrderById = orderId =>
  RequestService.post(`${API_BASE_URL}/orders/remove/${orderId}`);
export const addOrder = orderData =>
  RequestService.post(`${API_BASE_URL}/orders/`, orderData);
