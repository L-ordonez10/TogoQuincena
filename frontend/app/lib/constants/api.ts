export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const API_URL_CONFIGURED = Boolean(API_URL);

const normalizePathSegment = (path: string): string => 
  path.startsWith("/") ? path.slice(1) : path;

const normalizeBaseUrl = (url: string): string => 
  url.endsWith("/") ? url.slice(0, -1) : url;

export function buildUrl(path: string): string {
  if (!path) return "";
  
  const normalizedPath = normalizePathSegment(path);

  if (API_URL_CONFIGURED) {
    return `${normalizeBaseUrl(API_URL)}/${normalizedPath}`;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}/${normalizedPath}`;
  }

  return `/${normalizedPath}`;
}

export default buildUrl;
