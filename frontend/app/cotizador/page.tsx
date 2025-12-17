"use client";
import React, { useState } from 'react';
import { HeaderSection, SalaryInputCard, ResultCard, CTASection } from './components';

export default function Page() {
  const [salary, setSalary] = useState<number>(7500);

  return (
    <main className="min-h-screen py-12">
      <HeaderSection />

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        <SalaryInputCard salary={salary} setSalary={setSalary} />
        <ResultCard salary={salary} />
      </div>

      <CTASection />
    </main>
  );
}
