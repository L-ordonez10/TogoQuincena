export const createLogger = (context: string) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    info: (message: string, data?: unknown) => {
      if (isDevelopment) {
        console.log(`[${context}] ${message}`, data || "");
      }
    },

    warn: (message: string, data?: unknown) => {
      console.warn(`[${context}] ${message}`, data || "");
    },

    error: (message: string, error?: unknown) => {
      console.error(`[${context}] ${message}`, error || "");
      
      if (typeof window !== "undefined" && !isDevelopment) {
        // Aquí podrías enviar a un servicio de logging como Sentry
      }
    },

    security: (message: string, data?: unknown) => {
      console.error(`[SECURITY][${context}] ${message}`, data || "");
      
      if (typeof window !== "undefined") {
        // Siempre logear eventos de seguridad
      }
    },
  };
};

export const logger = createLogger("App");
