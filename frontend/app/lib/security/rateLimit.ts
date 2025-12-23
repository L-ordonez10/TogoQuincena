interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

const requestTracking = new Map<string, RequestRecord>();

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 100,
  windowMs: 60000,
};

export const rateLimiter = {
  check: (key: string, config: RateLimitConfig = DEFAULT_CONFIG): boolean => {
    const now = Date.now();
    const record = requestTracking.get(key);

    if (!record || now > record.resetTime) {
      requestTracking.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return true;
    }

    if (record.count >= config.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  },

  clear: (key: string): void => {
    requestTracking.delete(key);
  },

  clearAll: (): void => {
    requestTracking.clear();
  },
};

export const createRateLimitKey = (identifier: string, action: string): string => {
  return `${identifier}_${action}`;
};
