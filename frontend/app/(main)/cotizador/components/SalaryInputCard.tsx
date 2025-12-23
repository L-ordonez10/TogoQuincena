"use client";
import React, { useRef, useState } from "react";

interface Props {
  salary: number;
  setSalary: (n: number) => void;
}

const formatCurrency = (n: number) =>
  n ? `Q${n.toLocaleString("es-GT", { minimumFractionDigits: 2 })}` : "";

const parseCurrency = (s: string) => {
  const cleaned = s.replace(/[^\d.]/g, "");
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
};

const SalaryInputCard: React.FC<Props> = ({ salary, setSalary }) => {
  const [display, setDisplay] = useState("");
  const isEditing = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isEditing.current = true;
    const value = e.target.value;
    setDisplay(value);
    setSalary(parseCurrency(value));
  };

  const handleBlur = () => {
    isEditing.current = false;
    setDisplay(formatCurrency(salary));
  };

  const handleFocus = () => {
    isEditing.current = true;
    setDisplay(salary ? salary.toString() : "");
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl p-10 shadow-[0px_4px_4px_0px_#00000040]">
      <div className="max-w-md mx-auto text-lg">
        <p className="mb-4 text-gray-600 text-center font-medium">
          El máximo a otorgar es el 20% de tu salario (mínimo Q.500.00 - máximo Q.1,500.00)
        </p>
        <div className="max-w-xs m-auto">
          <label className="block text-gray-700 text-center font-medium">Ingresa el monto de tu salario</label>
          <input
            type="text"
            value={display}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder="Q7,500.00"
            className="mt-3 w-full rounded-md bg-[#F7F7F7] py-1 text-center text-gray-700 shadow-sm border border-transparent placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryInputCard;
