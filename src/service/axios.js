import axios from "axios";

const baseURL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;