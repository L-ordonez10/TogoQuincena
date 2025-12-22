// Centraliza constantes de entorno y utilidades relacionadas
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Indica si la URL de la API está configurada en el entorno
export const API_URL_CONFIGURED = Boolean(API_URL && API_URL.length > 0);

/**
 * Construye una URL completa juntando `NEXT_PUBLIC_API_URL` y la ruta relativa del archivo.
 * Si `NEXT_PUBLIC_API_URL` no está definida, intenta usar `window.location.origin`
 * cuando está disponible (cliente). Esto evita URLs vacías o `//` duplicadas.
 */
export function buildUrl(path: string) {
  if (!path) return "";
  const p = path.startsWith("/") ? path.slice(1) : path;

  // Si la API está configurada explícitamente, usarla
  if (API_URL_CONFIGURED) {
    const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
    return `${base}/${p}`;
  }

  // Fallback: si estamos en cliente, usar el origin actual
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    return `${window.location.origin}/${p}`;
  }

  // Último recurso: devolver ruta absoluta con slash
  return `/${p}`;
}

export default buildUrl;
