"use client";
import React from 'react';

interface Props {
  salary: number;
  setSalary: (n: number) => void;
}

const SalaryInputCard: React.FC<Props> = ({ salary, setSalary }) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md">
      <label className="block text-sm font-medium text-gray-700">Ingresa el monto de tu salario</label>
      <input
        type="number"
        value={salary}
        onChange={(e) => setSalary(Number(e.target.value))}
        className="mt-3 w-full rounded-md border px-4 py-2 text-center text-gray-700"
        placeholder="Q0.00"
      />
    </div>
  );
};

export default SalaryInputCard;
