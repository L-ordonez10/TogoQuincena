import { useState, useCallback } from "react";
import { rateLimiter, createRateLimitKey } from "@/lib/security";

interface UseSecureSubmitOptions {
  maxAttempts?: number;
  windowMs?: number;
  onRateLimitExceeded?: () => void;
}

export const useSecureSubmit = (
  submitFn: () => Promise<void>,
  identifier: string,
  options: UseSecureSubmitOptions = {}
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    maxAttempts = 5,
    windowMs = 60000,
    onRateLimitExceeded,
  } = options;

  const handleSubmit = useCallback(async () => {
    const rateLimitKey = createRateLimitKey(identifier, "submit");

    if (!rateLimiter.check(rateLimitKey, { maxRequests: maxAttempts, windowMs })) {
      const errorMsg = "Demasiados intentos. Por favor, espera un momento.";
      setError(errorMsg);
      onRateLimitExceeded?.();
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await submitFn();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al enviar");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [submitFn, identifier, maxAttempts, windowMs, onRateLimitExceeded]);

  return {
    handleSubmit,
    isSubmitting,
    error,
    clearError: () => setError(null),
  };
};
