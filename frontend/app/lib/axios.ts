import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { secureStorage } from "./secureStorage";

const REQUEST_TIMEOUT = 20000;
const API_KEY_HEADER = "x-api-key";
const AUTH_TOKEN_KEY = "auth_token";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    
    if (apiKey && config.headers) {
      config.headers[API_KEY_HEADER] = apiKey;
    }

    const token = secureStorage.getItem<string>(AUTH_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      secureStorage.removeItem(AUTH_TOKEN_KEY);
      
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    if (error.response?.status === 429) {
      console.warn("Rate limit exceeded. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
