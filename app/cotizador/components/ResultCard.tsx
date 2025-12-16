"use client";
import React from 'react';
import { clamp, formatCurrency } from './utils';

interface Props {
  salary: number;
}

const ResultCard: React.FC<Props> = ({ salary }) => {
  const max = clamp(salary * 0.2, 500, 1500);
  const requested = Math.round(max * 0.8 * 100) / 100; // ejemplo: 80% del max
  const gastos = Math.round(requested * 0.0625 * 100) / 100; // 6.25%
  const deposit = Math.round((requested - gastos) * 100) / 100;
  const toPay = Math.round((deposit * 1.245867) * 100) / 100; // factor de ejemplo sacado de diseño

  return (
    <div className="w-full max-w-md mx-auto mt-6 rounded-xl border border-[#D9F3B6] bg-white shadow-sm">
      <div className="p-6">
        <h3 className="text-sm text-gray-500">Monto máximo que podríamos otorgarte</h3>
        <p className="text-2xl font-bold text-[#90C928] mt-2">{formatCurrency(max)}</p>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Monto solicitado:</span>
            <span>{formatCurrency(requested)}</span>
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
