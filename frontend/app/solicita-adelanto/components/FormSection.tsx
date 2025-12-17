"use client"
import { PersonalDataForm, DocumentUploadList, PersonalReferencesForm, WorkReferencesForm, SummarySection, FormProvider } from "./form";
import { useFormCtx } from "./form/FormContext";

function SubmitControls() {
  const { data, validateAll } = useFormCtx();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validateAll();
    if (ok) {
      alert('Formulario válido. Valores:\n' + JSON.stringify(data, null, 2));
    } else {
      alert('Hay errores en el formulario. Revisa los campos resaltados.');
    }
  };

  return (
    <div className="flex justify-center ">
      <button onClick={handleSubmit} className="bg-[#017EFF] hover:bg-[#000000] transition-colors duration-300 text-white px-8 py-2 text-base md:text-lg rounded-md font-bold hover:opacity-90 cursor-pointer shadow-md">
        Solicitar Adelanto
      </button>
    </div>
  );
}

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