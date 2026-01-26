"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';

interface CotizadorContextValue {
  salary: number;
  setSalary: (value: number) => void;
  max: number;
}

const CotizadorContext = createContext<CotizadorContextValue | undefined>(undefined);

export function CotizadorProvider({ children }: { children: ReactNode }) {
  const [salary, setSalary] = useState<number>(7500);

  const max = useMemo(() => Math.min(salary * 0.2, 1500), [salary]);

  const value = useMemo(() => ({
    salary,
    setSalary,
    max,
  }), [salary, max]);

  return (
    <CotizadorContext.Provider value={value}>
      {children}
    </CotizadorContext.Provider>
  );
}

export function useCotizador() {
  const context = useContext(CotizadorContext);
  if (!context) {
    throw new Error('useCotizador must be used within CotizadorProvider');
  }
  return context;
}
