import React, { useCallback, memo } from 'react';
import FileUploader from '@/components/FileUploader';
import { useFormCtx } from './FormContext';

const DOCUMENT_CONFIGS = [
    {
        id: 'dpi',
        path: 'uploads.dpi',
        title: ["DPI (ambos lados)", "vigente y en buen estado."],
        note: "*en formato pdf o jpg",
        accept: ".pdf,.jpg,.jpeg",
        multiple: false,
    },
    {
        id: 'bankStatements',
        path: 'uploads.bankStatements',
        title: ["Estados de cuenta donde se refleje el pago de su planilla", "de los últimos 2 meses."],
        note: "*en formato pdf o jpg",
        accept: ".pdf,.jpg,.jpeg",
        multiple: true,
    },
    {
        id: 'electricityBill',
        path: 'uploads.electricityBill',
        title: ["Recibo de Servicio de Energia Eléctrica de tu", "Residencia del último mes."],
        note: "*en formato pdf o jpg",
        accept: ".pdf,.jpg,.jpeg",
        multiple: false,
    },
    {
        id: 'selfieWithDpi',
        path: 'uploads.selfieWithDpi',
        title: ["Fotografía de medio cuerpo, sosteniendo tu", "DPI."],
        note: "*en formato pdf o jpg",
        accept: ".pdf,.jpg,.jpeg",
        multiple: false,
    },
];

const DocumentUploadItem = memo(function DocumentUploadItem({ 
    config, 
    value, 
    error, 
    onChange 
}: { 
    config: typeof DOCUMENT_CONFIGS[number]; 
    value: File | null; 
    error?: string; 
    onChange: (files: FileList | null) => void;
}) {
    return (
        <div>
            <div className="h-full flex flex-col">
                <FileUploader
                    title={config.title}
                    note={config.note}
                    accept={config.accept}
                    multiple={config.multiple}
                    buttonText="Seleccionar archivo"
                    onChange={onChange}
                    value={value ? [value] : null}
                />
            </div>
            {error && (
                <p className="text-rose-500 font-bold text-sm text-center">{error}</p>
            )}
        </div>
    );
});

export const DocumentUploadList = memo(function DocumentUploadList() {
    const { data, errors, setField } = useFormCtx();

    const createHandler = useCallback((path: string) => {
        return (files: FileList | null) => {
            const file = files && files.length > 0 ? files[0] : null;
            setField(path, file);
        };
    }, [setField]);

    return (
        <div>
            <h2 className="text-[#94CE29] hover:text-black transition-colors duration-200 text-left font-bold text-lg lg:text-4xl mb-12">
                Adjunta la siguiente información
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                {DOCUMENT_CONFIGS.map((config) => (
                    <DocumentUploadItem
                        key={config.id}
                        config={config}
                        value={data.uploads[config.id as keyof typeof data.uploads] as File | null}
                        error={errors[config.path]}
                        onChange={createHandler(config.path)}
                    />
                ))}
            </div>
        </div>
    );
});
