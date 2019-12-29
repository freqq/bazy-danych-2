import RequestService from "common/services/RequestService";

export default loginRequest => RequestService.post("http://localhost:5000/api/v1/auth/login/", loginRequest);
