import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting utilities
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ', maximumFractionDigits: 2 });
};

export const formatCurrencyDisplay = (value: string | number): string => {
  const num = typeof value === 'string' ? parseFloat(value.replace(/\D/g, '')) : value;
  if (isNaN(num) || num === 0) return '';
  return `Q${num.toLocaleString('es-GT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const parseCurrency = (value: string): number => {
  const cleaned = value.replace(/[^\d.]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

// Number/digit utilities
export const sanitizeDigits = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const parseNumericValue = (value: string | number): number => {
  const num = typeof value === 'string' ? parseFloat(sanitizeDigits(value)) : value;
  return isNaN(num) ? 0 : num;
};

// Math utilities
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

// Business constants
export const LEGAL_FEES_GTQ = 75;
