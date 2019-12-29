import RequestService from "common/services/RequestService";

export const getCurrentUser = () => RequestService.get("http://localhost:5000/api/v1/user/me");
