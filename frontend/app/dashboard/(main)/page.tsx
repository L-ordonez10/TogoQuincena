
"use client";
import { useState } from "react";
import { useSolicitudes } from "@/hooks/useApi";
import { CardApplication } from "../components";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage <= 3) {
            for (let i = 1; i <= 4; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
        }
    }
    return pages;
}

export default function SolicitudesPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError } = useSolicitudes(currentPage, ITEMS_PER_PAGE);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#97D22A] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando solicitudes...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center text-red-600">
                    <p className="text-lg font-semibold">Error al cargar solicitudes</p>
                    <p className="text-sm">Por favor, intenta nuevamente</p>
                </div>
            </div>
        );
    }

    const totalPages = data?.meta?.totalPages || 1;
    const currentTotal = data?.meta?.total || 0;
    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, currentTotal);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="space-y-6">
            {/* Header con información */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mt-1">
                        Mostrando {startItem} - {endItem} de {currentTotal} solicitudes
                    </p>
                </div>
            </div>

            {/* Grid de solicitudes */}
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3">
                {data && data.solicitudes.length > 0 ? (
                    data.solicitudes.map((solicitud) => (
                        <CardApplication key={solicitud.id} solicitud={solicitud} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No hay solicitudes disponibles.</p>
                    </div>
                )}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Anterior
                    </Button>

                    <div className="flex gap-1">
                        {getPageNumbers(currentPage, totalPages).map((page, index) => (
                            page === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageClick(page as number)}
                                    className={currentPage === page ? "bg-[#97D22A] hover:bg-[#017EFF]" : ""}
                                >
                                    {page}
                                </Button>
                            )
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1"
                    >
                        Siguiente
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}


