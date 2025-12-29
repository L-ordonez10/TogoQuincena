"use client"
import React from "react";
import { useFormCtx } from "./FormContext";
import { useCreateApplication, useFileUpload } from "@/hooks/useApi";
import { uploadAllFiles } from "./uploadFiles";
import { Personal, Uploads, Reference, Legal, } from "@/lib/types/solicitudes";
export const SubmitControls: React.FC = () => {
  const { data, validateAll, reset } = useFormCtx();
  const createApplication = useCreateApplication();
  const fileUpload = useFileUpload();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      alert('Hay errores en el formulario. Revisa los campos resaltados.');
      return;
    }

    try {
      let uploadedFiles: Record<string, unknown> = {};
      if (data.uploads && (data.uploads.dpi || (data.uploads as any).bankStatements || data.uploads.electricityBill || data.uploads.selfieWithDpi)) {
        uploadedFiles = await uploadAllFiles(data, fileUpload);
      }

      const applicationPayload = {
        personal: data.personal as unknown as Personal,
        personalRefs: data.personalRefs as unknown as Reference[],
        workRefs: data.workRefs as unknown as Reference[],
        salary: data.salary.toString(),
        source: data.source || "",
        legal: data.legal as unknown as Legal,
        uploads: uploadedFiles as unknown as Uploads,
      };
      await createApplication.mutateAsync(applicationPayload);
      setSuccessMessage('Solicitud enviada exitosamente. Pronto te contactaremos.');

    } catch (error) {
      alert('Error al subir los archivos. Intenta de nuevo.');
      console.error('Error al subir archivos:', error);
    }
  };

  const isLoading = createApplication.isPending || fileUpload.isPending;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#017EFF] hover:bg-[#000000] transition-colors duration-300 text-white px-8 py-2 text-base md:text-lg rounded-md font-bold hover:opacity-90 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {fileUpload.isPending ? 'Subiendo archivos...' :
          createApplication.isPending ? 'Enviando solicitud...' :
            'Solicitar Adelanto'}
      </button>

      {successMessage && (
        <div role="status" aria-live="polite" className="w-full max-w-2xl mx-auto bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md shadow-sm flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 text-sm">
            <div className="font-semibold">{successMessage}</div>
            <div className="text-xs text-green-700">Te contactaremos pronto por los datos que proporcionaste.</div>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-green-600 hover:text-green-800 ml-2">Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default SubmitControls;
