import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { validateFileType, validateFileSize, ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE_MB } from '@/lib/security';

interface FileUploaderProps {
    title?: string | string[];
    note?: string;
    accept?: string;
    multiple?: boolean;
    buttonText?: string;
    iconColor?: string;
    className?: string;
    onChange?: (files: FileList | null) => void;
    value?: File[] | null;
    maxSizeMB?: number;
    allowedTypes?: string[];
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
    value,
    maxSizeMB = MAX_FILE_SIZE_MB,
    allowedTypes = ALLOWED_DOCUMENT_TYPES,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
        if (value && value.length > 0) {
            setSelectedFiles(value);
            setError(null);
        } else if (value === null) {
            setSelectedFiles([]);
            setError(null);
            if (inputRef.current) inputRef.current.value = '';
        }
    }, [value]);

    const openFileDialog = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        inputRef.current?.click();
    }, []);

    const validateFiles = useCallback((files: FileList): { valid: boolean; error?: string } => {
        const filesArray = Array.from(files);
        
        for (const file of filesArray) {
            if (!validateFileType(file, allowedTypes)) {
                return { 
                    valid: false, 
                    error: `Tipo de archivo no permitido: ${file.type}` 
                };
            }
            
            if (!validateFileSize(file, maxSizeMB)) {
                return { 
                    valid: false, 
                    error: `Archivo muy grande: máximo ${maxSizeMB}MB` 
                };
            }
        }
        
        return { valid: true };
    }, [allowedTypes, maxSizeMB]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setError(null);
        
        if (files && files.length > 0) {
            const validation = validateFiles(files);
            
            if (!validation.valid) {
                setError(validation.error || 'Error al validar archivo');
                if (inputRef.current) inputRef.current.value = '';
                return;
            }
            
            const arr = Array.from(files);
            setSelectedFiles(arr);
            onChange?.(files);
        }
    }, [onChange, validateFiles]);

    const handleRemove = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFiles([]);
        setError(null);
        onChange?.(null);
        if (inputRef.current) inputRef.current.value = '';
    }, [onChange]);

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

    if (selectedFiles.length > 0) {
        return (
            <div className={`group cursor-pointer flex h-full min-h-[275px] flex-col items-center justify-start font-sans ${className}`}>
                <div className="relative mb-6 flex size-32 items-center justify-center rounded-2xl bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.13)] border-2 border-[#90C928]/20">
                    <FileText size={48} color={iconColor} />
                    <div className="absolute -right-2 -top-2 rounded-full bg-white p-1 shadow-md">
                        <CheckCircle size={20} color={iconColor} fill="white" />
                    </div>
                </div>

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

                <div className="mt-auto flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="rounded-xl border text-sm border-red-200 bg-red-50 px-4 py-3 text-red-500 transition-colors hover:bg-red-100 flex items-center gap-2"
                        title="Eliminar archivo"
                    >
                        <Trash2 size={16} />
                        <span className="font-medium">Eliminar archivo</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div onClick={openFileDialog} className={`group cursor-pointer flex h-full min-h-[275px] flex-col items-center justify-start font-sans ${className}`}>
            <div className="mb-6 flex size-32 items-center justify-center rounded-2xl bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.13)] cursor-pointer transition-colors duration-200 group-hover:bg-[#90C928]">
                <Upload size={48} className="text-[#90C928] transition-colors duration-200 group-hover:text-white" />
            </div>

            <div className="mb-8 text-center px-4">
                {renderTitle()}
                <p className="text-base font-normal text-gray-900 mt-1">{note}</p>
                {error && (
                    <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle size={16} />
                        <span>{error}</span>
                    </div>
                )}
            </div>
            
            <div className="mt-auto">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); openFileDialog(e); }}
                    className="cursor-pointer transition-transform active:scale-95 hover:brightness-105"
                >
                    <div className="rounded-xl bg-[#90C928] px-4 py-3 text-sm font-bold text-white shadow-md">
                        {buttonText}
                    </div>
                </button>
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