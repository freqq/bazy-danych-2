import RequestService from "common/services/RequestService";

export const fetchPlanes = () =>
  RequestService.get("http://localhost:5000/api/v1/planes/");
export const removePlaneById = planeId =>
  RequestService.post(`http://localhost:5000/api/v1/planes/remove/${planeId}`);
