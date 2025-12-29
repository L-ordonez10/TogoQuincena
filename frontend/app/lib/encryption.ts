const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "togoQuincenaSecretKey2025";
const SEPARATOR = "_";
const CHECKSUM_LENGTH = 4;

const URL_SAFE_CHARS: Record<string, string> = {
  "+": "-",
  "/": "_",
  "=": "",
  "-": "+",
  "_": "/",
};

const replaceChars = (str: string, charMap: Record<string, string>): string =>
  str.replace(/[+/=\-_]/g, (char) => charMap[char] || char);

const addBase64Padding = (base64: string): string =>
  base64 + "=".repeat((4 - (base64.length % 4)) % 4);

const generateChecksum = (value: string): string => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(CHECKSUM_LENGTH, "0").slice(0, CHECKSUM_LENGTH);
};

const validateChecksum = (value: string, checksum: string): boolean => {
  return generateChecksum(value) === checksum;
};

export function encryptId(id: number | string): string {
  try {
    const idStr = id.toString();
    const checksum = generateChecksum(idStr);
    const timestamp = Date.now().toString(36);
    const combined = [SECRET_KEY, idStr, checksum, timestamp, SECRET_KEY].join(SEPARATOR);
    const encoded = btoa(combined);
    return replaceChars(encoded, { "+": "-", "/": "_", "=": "" });
  } catch (error) {
    console.error("Error encrypting ID:", error);
    return "";
  }
}

export function decryptId(encryptedId: string): number | null {
  try {
    // Normalize input: decode URI components (in case the slug was encoded in the URL),
    // convert URL-safe chars back to Base64 chars, remove any unexpected characters,
    // and add padding before decoding.
    const decodedSlug = decodeURIComponent(encryptedId);
    let base64 = decodedSlug.replace(/-/g, "+").replace(/_/g, "/");
    // Remove any characters not valid in base64 to avoid atob DOMException
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, "");
    const padded = addBase64Padding(base64);
    const decoded = atob(padded);
    const parts = decoded.split(SEPARATOR);

    if (parts.length === 5 && parts[0] === SECRET_KEY && parts[4] === SECRET_KEY) {
      const idStr = parts[1];
      const checksum = parts[2];
      const timestamp = parseInt(parts[3], 36);
      
      if (!validateChecksum(idStr, checksum)) {
        console.warn("Invalid checksum");
        return null;
      }

      const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;
      if (Date.now() - timestamp > ONE_YEAR) {
        console.warn("Encrypted ID expired");
        return null;
      }

      const id = parseInt(idStr, 10);
      return Number.isNaN(id) ? null : id;
    }

    return null;
  } catch (error) {
    console.error("Error decrypting ID:", error);
    return null;
  }
}

export function isValidEncryptedId(encryptedId: string): boolean {
  return decryptId(encryptedId) !== null;
}