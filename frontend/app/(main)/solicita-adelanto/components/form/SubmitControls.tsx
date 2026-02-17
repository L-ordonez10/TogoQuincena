"use client"
import React from "react";
import { useFormCtx } from "./FormContext";
import { useCreateApplication, useFileUpload, useHubSpotSubmit } from "@/hooks/useApi";
import { uploadAllFiles } from "./uploadFiles";
import { Personal, Uploads, Reference, Legal, } from "@/lib/types/solicitudes";
export const SubmitControls: React.FC = () => {
  const { data, validateAll, reset } = useFormCtx();
  const createApplication = useCreateApplication();
  const fileUpload = useFileUpload();
  const hubspotSubmit = useHubSpotSubmit();
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [rejectionMessage, setRejectionMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validateAll();
    if (!ok) {
      alert('Hay errores en el formulario. Revisa los campos resaltados.');
      return;
    }

    try {
      // Si el género es masculino, no enviar nada al backend
      if (data.personal.gender === 'masculino') {
        setRejectionMessage('En este momento no es posible procesar su prestamo');
        return;
      }

      // Si es femenino, procesar y enviar todos los datos
      let uploadedFiles: Record<string, unknown> = {};
      if (data.uploads && (data.uploads.dpi || (data.uploads as any).bankStatements || data.uploads.electricityBill || data.uploads.selfieWithDpi)) {
        uploadedFiles = await uploadAllFiles(data, fileUpload);
      }

      // Preparar datos personales, eliminando el campo gender
      const personalData = { ...data.personal };
      delete personalData.gender;

      const applicationPayload = {
        personal: personalData as unknown as Personal,
        personalRefs: data.personalRefs as unknown as Reference[],
        workRefs: data.workRefs as unknown as Reference[],
        salary: data.salary.toString(),
        amountRequested: data.amountRequested.toString(),
        source: data.source || "",
        legal: data.legal as unknown as Legal,
        uploads: uploadedFiles as unknown as Uploads,
      };

      // Enviar a la aplicación principal
      await createApplication.mutateAsync(applicationPayload);

      // Enviar a HubSpot en paralelo
      try {
        const hubspotPayload = {
          names: data.personal.names,
          surnames: data.personal.surnames,
          marriedLastName: data.personal.marriedLastName,
          birthDate: data.personal.birthDate,
          phone: data.personal.phone,
          dpi: data.personal.dpi,
          email: data.personal.email || '',
          address: data.personal.address,
          workName: data.personal.workName,
          addressWork: data.personal.addressWork,
          phoneWork: data.personal.phoneWork,
          salary: Number(data.salary) || 0,
          amountRequested: Number(data.amountRequested) || 0,
        };
        await hubspotSubmit.mutateAsync(hubspotPayload);
      } catch (hubspotError) {
        console.error('Error al enviar a HubSpot (no crítico):', hubspotError);
      }

      setSuccessMessage('Solicitud enviada exitosamente. Pronto te contactaremos.');
      reset();

    } catch (error) {
      alert('Error al subir los archivos. Intenta de nuevo.');
    }
  };

  const isLoading = createApplication.isPending || fileUpload.isPending || hubspotSubmit.isPending;

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#017EFF] hover:bg-[#000000] transition-colors duration-300 text-white px-8 py-2 text-base md:text-lg rounded-md font-bold hover:opacity-90 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {fileUpload.isPending ? 'Subiendo archivos...' :
          hubspotSubmit.isPending ? 'Enviando a HubSpot...' :
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

      {rejectionMessage && (
        <div role="alert" aria-live="assertive" className="w-full max-w-2xl mx-auto bg-orange-50 border border-orange-300 text-orange-900 px-4 py-3 rounded-md shadow-sm flex items-start gap-3">
          <div className="shrink-0 mt-0.5">
            <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1 text-sm">
            <div className="font-semibold">{rejectionMessage}</div>
          </div>
          <button onClick={() => setRejectionMessage(null)} className="text-orange-600 hover:text-orange-800 ml-2">Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default SubmitControls;
