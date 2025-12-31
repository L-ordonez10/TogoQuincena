export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const API_URL_CONFIGURED = Boolean(API_URL);

const normalizePathSegment = (path: string): string => 
  path.startsWith("/") ? path.slice(1) : path;

const normalizeBaseUrl = (url: string): string => 
  url.endsWith("/") ? url.slice(0, -1) : url;

export function buildUrl(path: string): string {
  if (!path) return "";
  
  // Convert backend absolute path to public URL path
  // e.g., "/app/uploads/file.jpg" -> "uploads/file.jpg"
  const publicPath = path.replace(/^\/app\//, "");
  
  const normalizedPath = normalizePathSegment(publicPath);

  if (API_URL_CONFIGURED) {
    const apiBase = normalizeBaseUrl(API_URL);
    // Si la URL del API termina en /api, usar la raíz del dominio
    // para las descargas públicas (ej. /uploads/...)
    const apiPublicBase = apiBase.replace(/\/api$/, "");
    const baseToUse = normalizedPath.startsWith("uploads") ? apiPublicBase : apiBase;
    return `${baseToUse}/${normalizedPath}`;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/${normalizedPath}`;
  }

  return `/${normalizedPath}`;
}

export default buildUrl;
