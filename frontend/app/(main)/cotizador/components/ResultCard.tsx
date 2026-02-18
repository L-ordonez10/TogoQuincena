"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import { clamp, formatCurrency, parseCurrency, LEGAL_FEES_GTQ } from '@/lib/utils';
import { useCotizador } from '../CotizadorContext';

const ResultCard: React.FC = memo(() => {
  const { salary, max } = useCotizador();
  const defaultRequested = useMemo(() => Math.round(max * 0.8 * 100) / 100, [max]);

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
  }, [salary, max, requested]);

  useEffect(() => {
    if (!isEditing.current) setDisplay(formatCurrency(requested));
  }, [requested]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    isEditing.current = true;
    const value = e.target.value;
    setDisplay(value);
    const n = parseCurrency(value);
    const clamped = clamp(n, 0, Math.min(max, 1500));
    setRequested(Math.round(clamped * 100) / 100);
  }, [max]);

  const handleBlur = useCallback(() => {
    isEditing.current = false;
    setDisplay(formatCurrency(requested));
  }, [requested]);

  const handleFocus = useCallback(() => {
    isEditing.current = true;
    setDisplay(requested ? requested.toString() : '');
  }, [requested]);

  const deposit = useMemo(() => Math.round((requested - LEGAL_FEES_GTQ) * 100) / 100, [requested]);
  const toPay = useMemo(() => Math.round((requested + requested * 0.336) * 100) / 100, [requested]);

  return (
    <div className="w-full max-w-md mx-auto mt-6 rounded-xl border border-[#D9F3B6] bg-white shadow-sm">
      <div className="p-6">
        <h3 className="text-sm text-gray-500">Monto máximo que podríamos otorgarte</h3>
        <p className="text-2xl font-bold text-[#90C928] mt-2">{formatCurrency(max)}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between items-center">
            <label htmlFor="monto-solicitado" className="cursor-default">Monto solicitado:</label>
            <input
              id="monto-solicitado"
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
            <span>-{formatCurrency(LEGAL_FEES_GTQ)}</span>
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
});

ResultCard.displayName = 'ResultCard';

export default ResultCard;
