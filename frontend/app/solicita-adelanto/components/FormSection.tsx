"use client"
import { PersonalDataForm, DocumentUploadList, PersonalReferencesForm, WorkReferencesForm, SummarySection, FormProvider } from "./form";
import { useFormCtx } from "./form/FormContext";
import { useCreateApplication, useFileUpload } from "@/hooks/useApi";

function SubmitControls() {
  const { data, validateAll } = useFormCtx();
  const createApplication = useCreateApplication();
  const fileUpload = useFileUpload();

  const uploadAllFiles = async (): Promise<Record<string, string | string[]>> => {
    const result: Record<string, string | string[]> = {};

    const uploadSingle = async (file: File) => {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fileUpload.mutateAsync(fd);
      if (!res || typeof res.filePath !== 'string') {
        throw new Error('Respuesta inválida del servidor al subir archivo');
      }
      return res.filePath;
    };

    // dpi
    if (data.uploads.dpi instanceof File) {
      console.log('Subiendo dpi:', data.uploads.dpi.name);
      result.dpi = await uploadSingle(data.uploads.dpi as File);
    }

    // bankStatements es un único File
    if (data.uploads.bankStatements instanceof File) {
      console.log('Subiendo bankStatements:', data.uploads.bankStatements.name);
      result.bankStatements = await uploadSingle(data.uploads.bankStatements as File);
    }

    // electricityBill
    if (data.uploads.electricityBill instanceof File) {
      console.log('Subiendo electricityBill:', data.uploads.electricityBill.name);
      result.electricityBill = await uploadSingle(data.uploads.electricityBill as File);
    }

    // selfieWithDpi
    if (data.uploads.selfieWithDpi instanceof File) {
      console.log('Subiendo selfieWithDpi:', data.uploads.selfieWithDpi.name);
      result.selfieWithDpi = await uploadSingle(data.uploads.selfieWithDpi as File);
    }

    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      alert('Hay errores en el formulario. Revisa los campos resaltados.');
      return;
    }

    try {
      let uploadedFiles: Record<string, any> = {};
      if (data.uploads && (data.uploads.dpi || (data.uploads as any).bankStatements || data.uploads.electricityBill || data.uploads.selfieWithDpi)) {
        uploadedFiles = await uploadAllFiles();
        console.log('Archivos subidos:', uploadedFiles);
      }



    } catch (error) {
      alert('Error al subir los archivos. Intenta de nuevo.');
      console.error('Error al subir archivos:', error);
    }
  };


  const isLoading = createApplication.isPending || fileUpload.isPending;

  return (
    <div className="flex justify-center ">
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#017EFF] hover:bg-[#000000] transition-colors duration-300 text-white px-8 py-2 text-base md:text-lg rounded-md font-bold hover:opacity-90 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {fileUpload.isPending ? 'Subiendo archivos...' :
          createApplication.isPending ? 'Enviando solicitud...' :
            'Solicitar Adelanto'}
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