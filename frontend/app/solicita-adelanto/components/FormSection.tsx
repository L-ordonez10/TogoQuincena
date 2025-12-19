"use client"
import { PersonalDataForm, DocumentUploadList, PersonalReferencesForm, WorkReferencesForm, SummarySection, FormProvider, SubmitControls } from "./form";

export const FormSection: React.FC = () => {
  return (
    <FormProvider>
      <section className='max-w-5xl mx-auto space-y-12 py-12 px-6 lg:px-0'>
        <p className='text-black hover:text-[#017EFF] transition-colors duration-200 text-center font-bold text-lg lg:text-2xl'>
          Verifica que cumplas con todos los requisitos antes de continuar.
        </p>

        <form className="space-y-20">
          <PersonalDataForm />
          <DocumentUploadList />
          <PersonalReferencesForm />
          <WorkReferencesForm />
          <SummarySection />
          <SubmitControls />
        </form>
      </section>
    </FormProvider>
  );
};
