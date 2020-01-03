import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchFlights = () =>
  RequestService.get(`${API_BASE_URL}/flights/`);
export const fetchCarrierNames = () =>
  RequestService.get(`${API_BASE_URL}/carriers/names`);
export const fetchPlanesNames = () =>
  RequestService.get(`${API_BASE_URL}/planes/names`);
export const fetchFlightById = flightId =>
  RequestService.get(`${API_BASE_URL}/flights/${flightId}`);
export const editFlightById = (flightId, flightData) =>
  RequestService.post(`${API_BASE_URL}/flights/${flightId}`, flightData);
export const removeFlightById = flightId =>
  RequestService.post(`${API_BASE_URL}/flights/remove/${flightId}`);
export const addFlight = flightData =>
  RequestService.post(`${API_BASE_URL}/flights/`, flightData);
