import axios from "axios";
import httpStatuses from "common/httpStatuses";

const JSON_CONTENT_TYPE = "application/json";

class RequestService {
  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        "Content-Type": JSON_CONTENT_TYPE,
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("jwtToken")
      }
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === httpStatuses.UNAUTHORIZED) {
          window.location.reload(true);
          return new Promise(() => false);
        }

        return Promise.reject(error);
      }
    );
  }

  get(url, params) {
    return this.axiosInstance.get(url, { params });
  }

  post(url, data) {
    return this.axiosInstance.post(url, data);
  }

  put(url, data) {
    return this.axiosInstance.put(url, data);
  }

  delete(url, params) {
    return this.axiosInstance.delete(url, { params });
  }
}

export default new RequestService();
