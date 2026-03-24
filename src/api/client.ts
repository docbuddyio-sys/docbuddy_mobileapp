import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import { storage } from "../utils/storage";

// Configuration for Environment
const IS_LOCAL = false; // Toggle this to 'false' to use the production URL
const LOCAL_API_URL = Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";
const PROD_API_URL = "https://lifevault-service-846550826824.us-central1.run.app";

const API_BASE_URL = IS_LOCAL ? LOCAL_API_URL : PROD_API_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
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
