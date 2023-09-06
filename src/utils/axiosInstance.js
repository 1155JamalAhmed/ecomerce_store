import axios from "axios";
import { server } from "../server";

const axiosInstance = axios.create({
  baseURL: server,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.log("Response Interceptor error:", error.response.data);
      console.log("Response Interceptor Status code:", error.response.status);
    } else if (error.request) {
      // The request was made, but no response was received i.e: the server is not running
      console.log("API request error:", error);
      error.response = {
        data: {
            message: "Something went terribly wrong, please come back later"
        }
      }
    } else {
      // Something else happened in making the request that triggered an error
      console.log("API unknown error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
