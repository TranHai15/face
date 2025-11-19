import axios from "axios";
import { env } from "../config/env";

// Tạo axios instance với cấu hình mặc định
const axiosClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // // Có thể thêm token, logging, etc.
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Xử lý lỗi chung
    if (error.response) {
      // Server trả về lỗi
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - có thể redirect đến login
          console.error("Unauthorized access");
          break;
        case 403:
          console.error("Forbidden access");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.error("API Error:", data?.message || error.message);
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.error("Network error - No response received");
    } else {
      // Lỗi khi setup request
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
