"use client";
import React from 'react';
import { HeaderSection, SalaryInputCard, ResultCard, CTASection } from './components';
import { CotizadorProvider } from './CotizadorContext';

// Nota: metadata se exporta desde metadata.ts debido a "use client"

export default function CotizadorPage() {
  return (
    <CotizadorProvider>
      <div className="min-h-screen py-12">
        <HeaderSection />

        <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          <SalaryInputCard />
          <ResultCard />
        </div>

        <CTASection />
      </div>
    </CotizadorProvider>
  );
}
