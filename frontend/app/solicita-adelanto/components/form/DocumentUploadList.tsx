import React from 'react';
import FileUploader from '@/components/FileUploader';
import { useFormCtx } from './FormContext';

export function DocumentUploadList() {
    const { data, errors, setField } = useFormCtx();

    const handleSingle = (path: string) => (files: FileList | null) => {
        const file = files && files.length > 0 ? files[0] : null;
        setField(path, file);
    };
    
    return (
        <div >
            <h2 className="text-[#94CE29] hover:text-black transition-colors duration-200 text-left font-bold text-lg lg:text-4xl mb-12">
                Adjunta la siguiente información
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                <div>

                    <div className="h-full flex flex-col">
                        <FileUploader
                            title={["DPI (ambos lados)", "vigente y en buen estado."]}
                            note="*en formato pdf o jpg"
                            accept=".pdf,.jpg,.jpeg"
                            buttonText="Seleccionar archivo"
                            onChange={handleSingle('uploads.dpi')}
                            value={data.uploads.dpi ? [data.uploads.dpi] : null}
                        />
                    </div>
                    {errors['uploads.dpi'] && <p className="text-rose-500 font-bold text-sm text-center">{errors['uploads.dpi']}</p>}
                </div>
                <div>

                    <div className="h-full flex flex-col">
                        <FileUploader
                            title={["Estados de cuenta donde se refleje el pago de su planilla", "de los últimos 2 meses."]}
                            note="*en formato pdf o jpg"
                            accept=".pdf,.jpg,.jpeg"
                            multiple
                            buttonText="Seleccionar archivo"
                            onChange={handleSingle('uploads.bankStatements')}
                            value={data.uploads.bankStatements ? [data.uploads.bankStatements] : null}
                        />
                    </div>
                    {errors['uploads.bankStatements'] && (
                        <p className="text-rose-500 font-bold text-sm text-center">{errors['uploads.bankStatements']}</p>
                    )}
                </div>

                <div>
                    <div className="h-full flex flex-col">
                        <FileUploader
                            title={["Recibo de Servicio de Energia Eléctrica de tu", "Residencia del último mes."]}
                            note="*en formato pdf o jpg"
                            accept=".pdf,.jpg,.jpeg"
                            buttonText="Seleccionar archivo"
                            onChange={handleSingle('uploads.electricityBill')}
                            value={data.uploads.electricityBill ? [data.uploads.electricityBill] : null}
                        />
                    </div>
                    {errors['uploads.electricityBill'] && (
                        <p className="text-rose-500 font-bold text-sm text-center">{errors['uploads.electricityBill']}</p>
                    )}
                </div>

                <div>

                    <div className="h-full flex flex-col">
                        <FileUploader
                            title={["Fotografía de medio cuerpo, sosteniendo tu", "DPI."]}
                            note="*en formato jpg"
                            accept=".jpg,.jpeg"
                            buttonText="Seleccionar archivo"
                            onChange={handleSingle('uploads.selfieWithDpi')}
                            value={data.uploads.selfieWithDpi ? [data.uploads.selfieWithDpi] : null}
                        />
                    </div>
                    {errors['uploads.selfieWithDpi'] && (
                        <p className="text-rose-500 font-bold text-sm text-center">{errors['uploads.selfieWithDpi']}</p>
                    )}
                </div>

            </div>
        </div>
    );
}
