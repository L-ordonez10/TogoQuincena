import React from 'react';

const HeaderSection: React.FC = () => {
  return (
    <header className="w-full max-w-3xl mx-auto text-center py-8">
      <h1 className="text-2xl font-bold">Cotizador</h1>
      <p className="mt-4 text-xl font-semibold text-[#90C928]">Haz la cotización de tu adelanto de salario con nuestro cotizador</p>
      <p className="mt-4 text-sm text-gray-600">El máximo a otorgar es el 20% de tu salario (mínimo Q.500.00 - máximo Q.1,500.00)</p>
    </header>
  );
};

export default HeaderSection;
