"use client";
import React, { useEffect, useRef, useState } from 'react';
import { clamp, formatCurrency } from './utils';

interface Props {
  salary: number;
}

const parseCurrency = (s: string) => {
  const cleaned = s.replace(/[^\d.]/g, '');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
};

const ResultCard: React.FC<Props> = ({ salary }) => {
  const max = Math.min(salary * 0.2, 1500);
  const defaultRequested = Math.round(max * 0.8 * 100) / 100; // 80% del max por defecto

  const [requested, setRequested] = useState<number>(defaultRequested);
  const [display, setDisplay] = useState<string>(formatCurrency(defaultRequested));
  const isEditing = useRef(false);

  useEffect(() => {
    // si cambia el salario y el solicitado actual excede el nuevo máximo, ajustarlo
    if (requested > max) {
      const newReq = Math.round(max * 100) / 100;
      setRequested(newReq);
      if (!isEditing.current) setDisplay(formatCurrency(newReq));
    }
  }, [salary, max]);

  useEffect(() => {
    if (!isEditing.current) setDisplay(formatCurrency(requested));
  }, [requested]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isEditing.current = true;
    const value = e.target.value;
    setDisplay(value);
    const n = parseCurrency(value);
    const clamped = clamp(n, 0, Math.min(max, 1500));
    setRequested(Math.round(clamped * 100) / 100);
  };

  const handleBlur = () => {
    isEditing.current = false;
    setDisplay(formatCurrency(requested));
  };

  const handleFocus = () => {
    isEditing.current = true;
    setDisplay(requested ? requested.toString() : '');
  };

  const gastos = 75; // gastos legales fijos
  const deposit = Math.round((requested - gastos) * 100) / 100;
  const toPay = Math.round((requested + requested * 0.336) * 100) / 100;

  return (
    <div className="w-full max-w-md mx-auto mt-6 rounded-xl border border-[#D9F3B6] bg-white shadow-sm">
      <div className="p-6">
        <h3 className="text-sm text-gray-500">Monto máximo que podríamos otorgarte</h3>
        <p className="text-2xl font-bold text-[#90C928] mt-2">{formatCurrency(max)}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between items-center">
            <span>Monto solicitado:</span>
            <input
              type="text"
              value={display}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder={formatCurrency(defaultRequested)}
              className="mt-1 w-32 rounded-md bg-[#F7F7F7] py-1 text-right text-gray-700 shadow-sm border border-transparent placeholder-gray-400"
            />
          </div>
          <div className="flex justify-between text-red-500">
            <span>Gastos legales:</span>
            <span>-{formatCurrency(gastos)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Te depositaremos:</span>
            <span className="text-[#90C928]">{formatCurrency(deposit)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tú deberás pagar:</span>
            <span>{formatCurrency(toPay)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
