import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchCarriers = () =>
  RequestService.get(`${API_BASE_URL}/carriers/`);
export const fetchCarrierById = carrierId =>
  RequestService.get(`${API_BASE_URL}/carriers/${carrierId}`);
export const editCarrierById = (carrierId, carrierData) =>
  RequestService.post(`${API_BASE_URL}/carriers/${carrierId}`, carrierData);
export const removeCarrierById = carrierId =>
  RequestService.post(`${API_BASE_URL}/carriers/remove/${carrierId}`);
export const addCarrier = carrierData =>
  RequestService.post(`${API_BASE_URL}/carriers/`, carrierData);
