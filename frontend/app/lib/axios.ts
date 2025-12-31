import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const REQUEST_TIMEOUT = 20000;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mostrar NEXT_PUBLIC_API_URL solo en producción (útil para depurar)
if (process.env.NODE_ENV === "production") {
  if (typeof window !== "undefined") {
    console.info("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
  } else {
    console.info(
      "NEXT_PUBLIC_API_URL (server):",
      process.env.NEXT_PUBLIC_API_URL
    );
  }
}
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (apiKey && config.headers) {
      config.headers["x-api-key"] = apiKey;
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
      console.warn("Unauthorized: API Key inválida o expirada");
    }

    if (error.response?.status === 429) {
      console.warn("Rate limit exceeded");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
