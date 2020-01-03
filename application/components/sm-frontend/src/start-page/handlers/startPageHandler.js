import RequestService from "common/services/RequestService";
import { API_BASE_URL } from "common/constants";

export default loginRequest =>
  RequestService.post(`${API_BASE_URL}/auth/login/`, loginRequest);
