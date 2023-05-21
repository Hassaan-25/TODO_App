import axios from "axios";

const API_URL = "http://localhost:5000/api";

const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 1 min.
  headers: headers,
});
export default axiosInstance;
