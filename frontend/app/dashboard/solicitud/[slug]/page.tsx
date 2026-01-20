"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSolicitud } from "@/hooks/useApi";
import { buildUrl } from "@/lib/constants";
import { decryptId, isValidEncryptedId } from "@/lib/encryption";
import type { Solicitud } from "@/lib/types/solicitudes";
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    CreditCard,
    Download,
    FileText,
    Mail,
    Phone,
    User,
    XCircle,
    BriefcaseBusiness
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SolicitudDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [downloading, setDownloading] = useState<string | null>(null);

    const slug = params.slug as string | undefined;
    const decryptedId = slug && isValidEncryptedId(slug) ? decryptId(slug) : null;
    const validSlug = Boolean(slug && decryptedId !== null);

    const idParam = decryptedId ?? undefined;
    const { data, isLoading, isError } = useSolicitud(idParam, Boolean(idParam));

    const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
    useEffect(() => {
        if (data) setSolicitud(data);
    }, [data]);

    const handleStatusChange = async (id: number, newStatus: string, comments?: string) => {
        try {
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

    const formatBirthday = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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

    const formatCurrencyNumber = (value: number) => {
        return value.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ', maximumFractionDigits: 2 });
    };

    const calculateFinancials = (salary: string, amountRequested: string) => {
        const salaryNum = parseInt(salary.replace(/[^\d]/g, ''));
        const requestedNum = parseInt(amountRequested.replace(/[^\d]/g, ''));
        
        if (isNaN(salaryNum) || isNaN(requestedNum)) return null;

        const max = Math.min(salaryNum * 0.2, 1500);
        const gastos = 75;
        const deposit = Math.round((requestedNum - gastos) * 100) / 100;
        const toPay = Math.round((requestedNum + requestedNum * 0.336) * 100) / 100;

        return { max, requested: requestedNum, gastos, deposit, toPay };
    };

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
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Información Personal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                                <p className="font-semibold">{solicitud.personal.names} {solicitud.personal.surnames} {solicitud.personal.marriedLastName && solicitud.personal.marriedLastName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Fecha de Nacimiento</p>
                                <p className="font-semibold">{formatBirthday(solicitud.personal.birthDate)}</p>
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
                                <p className="font-semibold flex items-start gap-1">
                                    <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                                    <span className="break-all">{solicitud.personal.email}</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Dirección Residencial</p>
                                <p className="font-semibold break-all">{solicitud.personal.address}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">6 Meses de Trabajo</p>
                            <Badge variant={solicitud.personal.hasSixMonths ? "default" : "secondary"} className="mt-1">
                                {solicitud.personal.hasSixMonths ? "Sí cumple" : "No cumple"}
                            </Badge>
                        </div>
                    </CardContent>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BriefcaseBusiness className="h-5 w-5" />
                            Información Laboral
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Nombre del Trabajo</p>
                                <p className="font-semibold">{solicitud.personal.workName}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Teléfono del Trabajo</p>
                                <p className="font-semibold flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {solicitud.personal.phoneWork}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Dirección del Trabajo</p>
                                <p className="font-semibold break-all">{solicitud.personal.addressWork}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Información Financiera */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Información Financiera
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Salario Mensual</p>
                                <p className="text-3xl font-bold text-green-600">{formatCurrency(solicitud.salary)}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Monto Solicitado</p>
                                <p className="text-3xl font-bold text-blue-600">{formatCurrency(solicitud.amountRequested)}</p>
                            </div>
                        </div>

                        {calculateFinancials(solicitud.salary, solicitud.amountRequested) && (
                            <div className="border-t pt-4">
                                <h4 className="text-sm font-medium text-gray-500 mb-3">Cálculo de Adelanto</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-700">Monto máximo que podríamos otorgar:</span>
                                        <span className="text-lg font-bold text-[#90C928]">
                                            {formatCurrencyNumber(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.max)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-700">Monto solicitado por el cliente:</span>
                                        <span className="text-xl font-bold text-blue-600">
                                            {formatCurrencyNumber(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.requested)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-red-500">
                                        <span className="text-sm">Gastos legales:</span>
                                        <span className="font-semibold">
                                            -{formatCurrencyNumber(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.gastos)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-t pt-2">
                                        <span className="text-sm font-semibold text-gray-700">Se depositará:</span>
                                        <span className="text-lg font-bold text-[#90C928]">
                                            {formatCurrencyNumber(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.deposit)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Deberá pagar:</span>
                                        <span className="font-semibold text-gray-700">
                                            {formatCurrencyNumber(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.toPay)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                <div key={label} className="flex items-center justify-between gap-3 p-3 border rounded-lg">
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <FileText className="h-5 w-5 text-gray-500 shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium">{label}</p>
                                            <p className="text-sm text-gray-500 truncate" title={path.split('/').pop()}>{path.split('/').pop()}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="shrink-0"
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
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <p className="font-semibold flex-1 wrap-break-word line-clamp-2">{ref.name}</p>
                                        <Badge variant={ref.kind === "personal" ? "default" : "secondary"} className="shrink-0">
                                            {ref.kind === "personal" ? "Personal" : "Laboral"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <Phone className="h-4 w-4 shrink-0" />
                                        <span className="break-all">{ref.phone}</span>
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
                        <div>
                            <p className="text-sm font-medium text-gray-500">¿Dónde escuchó del negocio?</p>
                            <p className="font-semibold">{solicitud.source}</p>
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
