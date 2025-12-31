import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { secureStorage } from "./secureStorage";

const REQUEST_TIMEOUT = 20000;
const API_KEY_HEADER = "x-api-key";

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api`
  : "/api";

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
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

    if (config.data instanceof FormData && config.headers) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default axiosInstance;
