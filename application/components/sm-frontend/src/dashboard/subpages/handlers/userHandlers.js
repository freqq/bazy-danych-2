import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const fetchProfileData = () =>
  RequestService.get(`${API_BASE_URL}/user/profile`);
export const editUserData = userData =>
  RequestService.post(`${API_BASE_URL}/user/`, userData);
