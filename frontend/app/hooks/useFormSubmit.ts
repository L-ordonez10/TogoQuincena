"use client";

import { useState, useCallback } from 'react';
import type { FormData } from '@/(main)/solicita-adelanto/components/form/types';
import type { Personal, Uploads, Reference, Legal } from '@/lib/types/solicitudes';
import { useCreateApplication, useFileUpload } from '@/hooks/useApi';

interface UseFormSubmitProps {
  data: FormData;
  validateAll: () => boolean;
  reset: () => void;
}

interface UploadFilesFunction {
  (data: FormData, fileUpload: ReturnType<typeof useFileUpload>): Promise<Record<string, unknown>>;
}

export function useFormSubmit({ data, validateAll, reset }: UseFormSubmitProps, uploadAllFiles: UploadFilesFunction) {
  const createApplication = useCreateApplication();
  const fileUpload = useFileUpload();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Clear previous messages
    setSuccessMessage(null);
    setErrorMessage(null);

    // Validate
    const ok = validateAll();
    if (!ok) {
      setErrorMessage('Hay errores en el formulario. Revisa los campos resaltados.');
      return false;
    }
    
    try {
      // Upload files
      let uploadedFiles: Record<string, unknown> = {};
      if (data.uploads && (data.uploads.dpi || data.uploads.bankStatements || data.uploads.electricityBill || data.uploads.selfieWithDpi)) {
        uploadedFiles = await uploadAllFiles(data, fileUpload);
      }

      // Prepare payload
      const applicationPayload = {
        personal: data.personal as unknown as Personal,
        personalRefs: data.personalRefs as unknown as Reference[],
        workRefs: data.workRefs as unknown as Reference[],
        salary: data.salary.toString(),
        amountRequested: data.amountRequested.toString(),
        source: data.source || "",
        legal: data.legal as unknown as Legal,
        uploads: uploadedFiles as unknown as Uploads,
      };

      // Submit
      await createApplication.mutateAsync(applicationPayload);
      setSuccessMessage('Solicitud enviada exitosamente. Pronto te contactaremos.');

      // Reset form
      reset();
      
      return true;
    } catch (error) {
      setErrorMessage('Error al enviar la solicitud. Por favor intenta de nuevo.');
      return false;
    }
  }, [data, validateAll, reset, createApplication, fileUpload, uploadAllFiles]);

  const isLoading = createApplication.isPending || fileUpload.isPending;
  const uploadProgress = fileUpload.isPending ? 'Subiendo archivos...' : 
                         createApplication.isPending ? 'Enviando solicitud...' : null;

  return {
    handleSubmit,
    isLoading,
    uploadProgress,
    successMessage,
    errorMessage,
    clearMessages: useCallback(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, []),
  };
}
