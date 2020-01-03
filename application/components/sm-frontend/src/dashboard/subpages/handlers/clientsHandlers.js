import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchClients = () =>
  RequestService.get(`${API_BASE_URL}/clients/`);
export const fetchClientById = clientId =>
  RequestService.get(`${API_BASE_URL}/clients/${clientId}`);
export const editClientById = (clientId, clientData) =>
  RequestService.post(`${API_BASE_URL}/clients/${clientId}`, clientData);
export const removeClientById = clientId =>
  RequestService.post(`${API_BASE_URL}/clients/remove/${clientId}`);
export const addClient = clientData =>
  RequestService.post(`${API_BASE_URL}/clients/`, clientData);
