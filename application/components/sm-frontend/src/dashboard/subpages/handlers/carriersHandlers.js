import RequestService from "common/services/RequestService";

export const fetchCarriers = () =>
  RequestService.get("http://localhost:5000/api/v1/carriers/");
export const fetchCarrierById = carrierId =>
  RequestService.get(`http://localhost:5000/api/v1/carriers/${carrierId}`);
export const editCarrierById = (carrierId, carrierData) =>
  RequestService.post(
    `http://localhost:5000/api/v1/carriers/${carrierId}`,
    carrierData
  );
export const removeCarrierById = carrierId =>
  RequestService.post(`http://localhost:5000/api/v1/carriers/remove/${carrierId}`);
export const addCarrier = carrierData =>
  RequestService.post(`http://localhost:5000/api/v1/carriers/`, carrierData);
