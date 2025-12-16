import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="w-full bg-[#90C928] mt-12 py-12 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-bold">¿Listo para obtener tu adelanto?</h3>
        <p className="mt-2 text-sm opacity-90">Únete a miles de guatemaltecos que ya confían en QuincenaToGo</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#90C928]">Solicitar adelanto ahora</button>
          <button className="rounded-md border border-white px-4 py-2 text-sm">Conocer más</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
