import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000, // 20 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Añadir API Key a todas las peticiones
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey && config.headers) {
      config.headers["x-api-key"] = apiKey;
    }

    // Si el body es FormData, eliminar Content-Type para que el navegador
    // añada el boundary correcto automáticamente.
    try {
      if (config && config.data instanceof FormData) {
        if (config.headers) {
          delete (config.headers as any)["Content-Type"];
        }
      }
    } catch (e) {
      // En entornos donde FormData no está definido (SSR), ignorar.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
