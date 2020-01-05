import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchValuableOrders = () =>
  RequestService.get(`${API_BASE_URL}/orders/valuable`);
export const fetchPlanes = () =>
  RequestService.get(`${API_BASE_URL}/orders/mostflights`);
export const fetchBigPlanesData = () =>
  RequestService.get(`${API_BASE_URL}/orders/largest`);
