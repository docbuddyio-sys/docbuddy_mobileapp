import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { storage } from "../utils/storage";

const API_BASE_URL = "https://docbuddy-service.onrender.com";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle Global Errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401) {
      // Logic for logout or refresh token could go here
      await storage.clearAll();
      // Potentially trigger a global logout state or redirect to login
    }

    // Standardize error message
    const message = error.response?.data?.message || "Something went wrong";
    return Promise.reject({ ...error, message });
  },
);

export default apiClient;
