"use client";
import React from 'react';
import { HeaderSection, SalaryInputCard, ResultCard, CTASection } from './components';
import { CotizadorProvider } from './CotizadorContext';

export default function Page() {
  return (
    <CotizadorProvider>
      <main className="min-h-screen py-12">
        <HeaderSection />

        <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          <SalaryInputCard />
          <ResultCard />
        </div>

        <CTASection />
      </main>
    </CotizadorProvider>
  );
}
