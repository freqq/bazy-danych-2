import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export const getCurrentUser = () =>
  RequestService.get(`${API_BASE_URL}/user/me`);
