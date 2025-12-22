
"use client";
import { useSolicitudes } from "@/hooks/useApi";
import { CardApplication } from "../components";

export default function SolicitudesPage() {
    const { data, isLoading, isError } = useSolicitudes();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading solicitudes.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4 lg:grid-cols-3">
                {data && data.solicitudes.length > 0 ? (
                    data.solicitudes.map((solicitud) => (
                        <CardApplication key={solicitud.id} solicitud={solicitud} />
                    ))
                ) : (
                    <div>No hay solicitudes disponibles.</div>
                )}
            </div>

        </div>
    );
}


