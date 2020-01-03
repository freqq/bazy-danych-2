import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchPlanes = () =>
  RequestService.get(`${API_BASE_URL}/planes/`);
export const fetchPlaneById = planeId =>
  RequestService.get(`${API_BASE_URL}/planes/${planeId}`);
export const editPlaneById = (planeId, planeData) =>
  RequestService.post(`${API_BASE_URL}/planes/${planeId}`, planeData);
export const removePlaneById = planeId =>
  RequestService.post(`${API_BASE_URL}/planes/remove/${planeId}`);
export const addPlane = planeData =>
  RequestService.post(`${API_BASE_URL}/planes/`, planeData);
