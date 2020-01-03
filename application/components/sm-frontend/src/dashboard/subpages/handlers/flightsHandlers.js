import RequestService from "common/services/RequestService";

export const fetchFlights = () =>
  RequestService.get("http://localhost:5000/api/v1/flights/");
export const fetchCarrierNames = () =>
  RequestService.get("http://localhost:5000/api/v1/carriers/names");
export const fetchPlanesNames = () =>
  RequestService.get("http://localhost:5000/api/v1/planes/names");
export const fetchFlightById = flightId =>
  RequestService.get(`http://localhost:5000/api/v1/flights/${flightId}`);
export const editFlightById = (flightId, flightData) =>
  RequestService.post(
    `http://localhost:5000/api/v1/flights/${flightId}`,
    flightData
  );
export const removeFlightById = flightId =>
  RequestService.post(
    `http://localhost:5000/api/v1/flights/remove/${flightId}`
  );
export const addFlight = flightData =>
  RequestService.post(`http://localhost:5000/api/v1/flights/`, flightData);
