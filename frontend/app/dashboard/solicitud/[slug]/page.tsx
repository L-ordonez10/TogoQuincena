"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    User,
    Calendar,
    Phone,
    Mail,
    CreditCard,
    FileText,
    Download,
    CheckCircle,
    XCircle
} from "lucide-react";
import { decryptId, isValidEncryptedId } from "@/lib/encryption";
import { buildUrl } from "@/lib/constants";
import { useSolicitudes } from "@/hooks/useApi";
import type { Solicitud } from "@/lib/types/solicitudes";

export default function SolicitudDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { data: { solicitudes } = { solicitudes: [] }, isLoading, isError } = useSolicitudes();
    const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
    const [validSlug, setValidSlug] = useState(true);
    const [downloading, setDownloading] = useState<string | null>(null);

    useEffect(() => {
        const slug = params.slug as string;

        // Validar y desencriptar el slug
        if (!slug || !isValidEncryptedId(slug)) {
            setValidSlug(false);
            return;
        }

        const decryptedId = decryptId(slug);
        if (decryptedId === null) {
            setValidSlug(false);
            return;
        }

        // Buscar la solicitud en los datos
        if (solicitudes.length > 0) {
            const foundSolicitud = solicitudes.find((s: Solicitud) => s.id === decryptedId);
            setSolicitud(foundSolicitud || null);
        }
    }, [params.slug, solicitudes]);

    const handleStatusChange = async (id: number, newStatus: string, comments?: string) => {
        try {
            // Aquí iría la llamada al API para actualizar el estado
            console.log(`Solicitud ${id} actualizada a ${newStatus}`, comments && `Comentarios: ${comments}`);

            // Actualizar el estado local
            if (solicitud) {
                setSolicitud({
                    ...solicitud,
                    estadoSolicitud: newStatus as "PENDIENTE" | "APROBADO" | "RECHAZADO",
                    actualizadoEn: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error("Error actualizando estado de solicitud:", error);
            throw error;
        }
    };

    async function downloadFile(path: string) {
        if (!path) return;
        const url = buildUrl(path);
        try {
            setDownloading(path);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const filename = path.split('/').pop() || 'archivo';
            const objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(objectUrl);
        } catch (err) {
            console.error('Error descargando archivo', err);
            // feedback mínimo
            alert('No se pudo descargar el archivo. Verifica CORS o la URL.');
        } finally {
            setDownloading(null);
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount: string) => {
        const num = parseInt(amount.replace(/[^\d]/g, ''));
        if (isNaN(num)) return amount;
        return new Intl.NumberFormat('es-GT', {
            style: 'currency',
            currency: 'GTQ'
        }).format(num);
    };

    // Estados de carga y error
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </div>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-lg text-gray-600">Cargando detalles de solicitud...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !validSlug) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <div className="text-red-500 text-6xl mb-4">⚠️</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {isError ? "Error al cargar solicitud" : "Solicitud no encontrada"}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {isError
                                    ? "Hubo un problema al conectar con el servidor."
                                    : "La solicitud que buscas no existe o el enlace es inválido."
                                }
                            </p>
                            <Button onClick={() => router.push('/dashboard')}>
                                Volver al dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!solicitud) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </div>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Solicitud no encontrada</h3>
                            <p className="text-gray-600 mb-4">No se encontró la solicitud especificada.</p>
                            <Button onClick={() => router.push('/dashboard')}>
                                Volver al dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Información Personal */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Información Personal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                            <p className="font-semibold">{solicitud.personal.names} {solicitud.personal.surnames} {solicitud.personal.marriedLastName && solicitud.personal.marriedLastName}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                                <p className="font-semibold">{formatDate(solicitud.personal.birthDate)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">DPI</p>
                                <p className="font-semibold">{solicitud.personal.dpi}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                <p className="font-semibold flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {solicitud.personal.phone}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <p className="font-semibold flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {solicitud.personal.email}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">6 Meses de Trabajo</p>
                            <Badge variant={solicitud.personal.hasSixMonths ? "default" : "secondary"} className="mt-1">
                                {solicitud.personal.hasSixMonths ? "Sí cumple" : "No cumple"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Información Financiera */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Información Financiera
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Salario</p>
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(solicitud.salary)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Fuente de Ingresos</p>
                            <p className="font-semibold">{solicitud.source}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Documentos */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Documentos Adjuntos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries({
                                'DPI': solicitud.uploads.dpi,
                                'Estados de Cuenta': solicitud.uploads.bankStatements,
                                'Recibo de Luz': solicitud.uploads.electricityBill,
                                'Selfie con DPI': solicitud.uploads.selfieWithDpi
                            }).map(([label, path]) => (
                                <div key={label} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">{label}</p>
                                            <p className="text-sm text-gray-500">{path.split('/').pop()}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            await downloadFile(path);
                                        }}
                                        disabled={!path || downloading === path}
                                    >
                                        {downloading === path ? (
                                            'Descargando...'
                                        ) : (
                                            <>
                                                <Download className="h-4 w-4 mr-2" />
                                                Descargar
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Referencias */}
                <Card>
                    <CardHeader>
                        <CardTitle>Referencias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {solicitud.references.map((ref) => (
                                <div key={ref.id} className="p-3 border rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-semibold">{ref.name}</p>
                                        <Badge variant={ref.kind === "personal" ? "default" : "secondary"}>
                                            {ref.kind === "personal" ? "Personal" : "Laboral"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <Phone className="h-4 w-4" />
                                        {ref.phone}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Información Legal y Fechas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Información Adicional
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Consentimientos */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">Consentimientos</p>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Aceptación de términos</span>
                                    {solicitud.legal.acceptance ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Consentimiento de datos</span>
                                    {solicitud.legal.consent ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Fechas */}
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-2">Fechas</p>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-600">Fecha de Solicitud</p>
                                    <p className="font-semibold">{formatDate(solicitud.fechaSolicitud)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Última Actualización</p>
                                    <p className="font-semibold">{formatDate(solicitud.actualizadoEn)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
