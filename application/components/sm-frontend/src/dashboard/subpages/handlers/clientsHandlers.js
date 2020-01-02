import RequestService from "common/services/RequestService";

export const fetchClients = () =>
  RequestService.get("http://localhost:5000/api/v1/clients/");
export const fetchClientById = clientId =>
  RequestService.get(`http://localhost:5000/api/v1/clients/${clientId}`);
export const editClientById = (clientId, clientData) =>
  RequestService.post(
    `http://localhost:5000/api/v1/clients/${clientId}`,
    clientData
  );
export const removeClientById = clientId =>
  RequestService.post(`http://localhost:5000/api/v1/clients/remove/${clientId}`);
export const addClient = clientData =>
  RequestService.post(`http://localhost:5000/api/v1/clients/`, clientData);
