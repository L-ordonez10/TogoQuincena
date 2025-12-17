import React, { useState, useRef } from 'react';
import { Upload, FileText, Trash2, CheckCircle } from 'lucide-react';

interface FileUploaderProps {
    title?: string | string[];
    note?: string;
    accept?: string;
    multiple?: boolean;
    buttonText?: string;
    iconColor?: string;
    className?: string;
    onChange?: (files: FileList | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    title = ['DPI (ambos lados)', 'vigente y en buen estado.'],
    note = '*en formato pdf o jpg',
    accept = '.pdf,.jpg,.jpeg',
    multiple = false,
    buttonText = 'Seleccionar archivo',
    iconColor = '#90C928',
    className = '',
    onChange,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const openFileDialog = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const arr = Array.from(files);
            setSelectedFiles(arr);
            onChange?.(files);
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedFiles([]);
        onChange?.(null);
    };

    const renderTitle = () => {
        if (Array.isArray(title)) {
            return title.map((line, i) => (
                <h3 key={i} className={`text-lg text-gray-900 leading-tight ${i === title.length - 1 ? 'mb-1' : ''}`}>
                    {line}
                </h3>
            ));
        }
        return <h3 className="text-lg text-gray-900 leading-tight">{title}</h3>;
    };

    // VISTA: Cuando YA hay un archivo seleccionado
    if (selectedFiles.length > 0) {
        return (
            <div className={`group cursor-pointer flex h-full min-h-[275px] flex-col items-center justify-start font-sans ${className}`}>
                {/* Icono de Archivo con indicador de éxito */}
                <div className="relative mb-6 flex size-32 items-center justify-center rounded-2xl bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.13)] border-2 border-[#90C928]/20">
                    <FileText size={48} color={iconColor} />
                    {/* Pequeño check flotante para indicar éxito */}
                    <div className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md">
                        <CheckCircle size={20} color={iconColor} fill="white" />
                    </div>
                </div>

                {/* Nombre del archivo */}
                <div className="mb-8 flex w-full max-w-[200px] flex-col items-center text-center">
                    <p className="mb-1 w-full truncate text-lg font-bold text-gray-900" title={selectedFiles[0].name}>
                        {selectedFiles[0].name}
                    </p>
                    <p className="text-sm font-medium text-[#90C928]">
                        ¡Archivo listo!
                    </p>
                    {selectedFiles.length > 1 && (
                        <span className="text-xs text-gray-500">
                            + {selectedFiles.length - 1} archivo(s) más
                        </span>
                    )}
                </div>

                {/* Botones de acción */}
                <div className="mt-auto flex items-center gap-3">
                    {/* Botón Eliminar (rojo suave) */}
           

                    {/* Botón Cambiar (Reutiliza el input file) */}
                    <button
                        type="button"
                        onClick={(e) => openFileDialog(e)}
                        className="cursor-pointer transition-transform active:scale-95 hover:brightness-105"
                    >
                        <div className="rounded-xl bg-[#90C928] px-6 py-3 text-sm font-bold text-white shadow-md hover:opacity-90">
                            Cambiar archivo
                        </div>
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleRemove(e); }}
                        className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-500 transition-colors hover:bg-red-100"
                        title="Eliminar archivo"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        );
    }

    // VISTA: Estado inicial (Vacío)
    return (
        <div onClick={openFileDialog} className={`group cursor-pointer flex h-full min-h-[275px] flex-col items-center justify-start font-sans ${className}`}>
            <div className="mb-6 flex size-32 items-center justify-center rounded-2xl bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.13)] cursor-pointer transition-colors duration-200 group-hover:bg-[#90C928]">
                <Upload size={48} className="text-[#90C928] transition-colors duration-200 group-hover:text-white" />
            </div>

            <div className="mb-8 text-center px-4">
                {renderTitle()}
                <p className="text-base font-normal text-gray-900 mt-1">{note}</p>
            </div>
            
            <div className="mt-auto">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); openFileDialog(e); }}
                    className="cursor-pointer transition-transform active:scale-95 hover:brightness-105"
                >
                    <div className="rounded-xl bg-[#90C928] px-4 py-3 text-sm font-bold text-white shadow-md hover:opacity-90">
                        {buttonText}
                    </div>
                </button>
                {/* input usado por todo el componente (se dispara al click en cualquier parte) */}
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default FileUploader;