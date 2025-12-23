import React from 'react';

const HeaderSection: React.FC = () => {
  return (
    <header className="w-full max-w-lg mx-auto text-center py-8">
      <h1 className="hover:text-[#97D22A] transition-colors duration-200 text-xl sm:text-3xl md:text-[40px] text-center font-bold mb-2 leading-tight ">
        Cotizador
      </h1>
      <h2 className="text-[#97D22A] text-xl sm:text-2xl text-center md:text-[30px] font-bold mb-6 leading-snug">
        Haz la cotización de tu adelanto de salario con nuestro cotizador
      </h2>
    </header>
  );
};

export default HeaderSection;
