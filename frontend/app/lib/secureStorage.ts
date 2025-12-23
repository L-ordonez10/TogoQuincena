const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "default-key-change-in-production";

interface SecureStorageOptions {
  expiresIn?: number;
}

interface StorageItem<T> {
  value: T;
  expiresAt?: number;
}

const encryptData = (data: string): string => {
  try {
    return btoa(encodeURIComponent(data));
  } catch (error) {
    console.error("Encryption error:", error);
    return data;
  }
};

const decryptData = (encrypted: string): string => {
  try {
    return decodeURIComponent(atob(encrypted));
  } catch (error) {
    console.error("Decryption error:", error);
    return encrypted;
  }
};

export const secureStorage = {
  setItem: <T>(key: string, value: T, options?: SecureStorageOptions): void => {
    if (typeof window === "undefined") return;

    try {
      const item: StorageItem<T> = {
        value,
        expiresAt: options?.expiresIn ? Date.now() + options.expiresIn : undefined,
      };

      const encrypted = encryptData(JSON.stringify(item));
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error("Error saving to secure storage:", error);
    }
  },

  getItem: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;

    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = decryptData(encrypted);
      const item: StorageItem<T> = JSON.parse(decrypted);

      if (item.expiresAt && Date.now() > item.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error("Error reading from secure storage:", error);
      return null;
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};
