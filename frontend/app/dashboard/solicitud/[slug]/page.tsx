"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSolicitud } from "@/hooks/useApi";
import { buildUrl } from "@/lib/constants";
import { decryptId, isValidEncryptedId } from "@/lib/encryption";
import type { Solicitud } from "@/lib/types/solicitudes";
import { formatCurrency, parseNumericValue } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    CreditCard,
    Download,
    FileText,
    Mail,
    Phone,
    Printer,
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

    const calculateFinancials = (salary: string, amountRequested: string) => {
        const salaryNum = parseNumericValue(salary);
        const requestedNum = parseNumericValue(amountRequested);

        if (isNaN(salaryNum) || isNaN(requestedNum)) return null;

        const max = Math.min(salaryNum * 0.2, 1500);
        const gastos = 75;
        const deposit = Math.round((requestedNum - gastos) * 100) / 100;
        const toPay = Math.round((requestedNum + requestedNum * 0.336) * 100) / 100;

        return { max, requested: requestedNum, gastos, deposit, toPay };
    };

    const handlePrint = () => {
        if (!solicitud) return;
        const fin = calculateFinancials(solicitud.salary, solicitud.amountRequested);
        const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
        const expediente = solicitud.id.toString().padStart(6, '0');
        const fullName = solicitud.personal.names + ' ' + solicitud.personal.surnames +
            (solicitud.personal.marriedLastName ? ' ' + solicitud.personal.marriedLastName : '');
        const solicitudDate = new Date(solicitud.fechaSolicitud).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

        const montoSolicitado = fin ? formatCurrency(fin.requested) : formatCurrency(parseNumericValue(solicitud.amountRequested));
        const montoDepositar  = fin ? formatCurrency(fin.deposit)   : '—';
        const montoReembolsar = fin ? formatCurrency(fin.toPay)      : '—';
        const gastos          = fin ? formatCurrency(fin.gastos)     : '—';

        const referencesHtml = solicitud.references.map(ref =>
            '<tr>' +
            '<td>' + ref.name + '</td>' +
            '<td>' + (ref.kind === 'personal' ? 'Personal' : 'Laboral') + '</td>' +
            '<td>' + ref.phone + '</td>' +
            '</tr>'
        ).join('');

        const html =
            '<!DOCTYPE html>\n<html lang="es">\n<head>\n' +
            '<meta charset="UTF-8" />\n' +
            '<title>Contrato de Adelanto de Salario \u2014 ' + fullName + '</title>\n' +
            '<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap" rel="stylesheet" />\n' +
            '<style>\n' +
            '@page { size: letter; margin: 2.2cm 2.8cm; }\n' +
            '* { box-sizing: border-box; margin: 0; padding: 0; }\n' +
            'body { font-family: Lato, sans-serif; font-size: 10pt; color: #000000; line-height: 1.55; background: #fff; }\n' +

            /* ---- HEADER ---- */
            '.header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #97d22a; padding-bottom: 12px; margin-bottom: 18px; }\n' +
            '.logo { font-size: 20pt; font-weight: 900; color: #000; letter-spacing: 2px; text-transform: uppercase; line-height: 1; }\n' +
            '.logo span { color: #97d22a; }\n' +
            '.header-right { text-align: right; font-size: 8.5pt; color: #555; line-height: 1.6; }\n' +
            '.header-right strong { font-size: 10pt; color: #000; display: block; }\n' +

            /* ---- DOC TITLE ---- */
            '.doc-title-block { text-align: center; margin-bottom: 16px; }\n' +
            '.doc-title-block h1 { font-size: 13pt; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: #000; }\n' +
            '.doc-title-block p { font-size: 8.5pt; color: #555; margin-top: 3px; }\n' +
            '.status-badge { display: inline-block; padding: 2px 12px; border-radius: 2px; font-size: 8.5pt; font-weight: 700; letter-spacing: 0.5px; margin-left: 6px; vertical-align: middle; }\n' +
            '.status-PENDIENTE { background: #fef9c3; color: #854d0e; }\n' +
            '.status-APROBADO  { background: #97d22a; color: #000000; }\n' +
            '.status-RECHAZADO { background: #fee2e2; color: #991b1b; }\n' +

            /* ---- INTRO PARAGRAPH ---- */
            '.intro { font-size: 9.5pt; text-align: justify; margin-bottom: 16px; line-height: 1.65; }\n' +

            /* ---- SECTION ---- */
            '.section { margin-bottom: 14px; }\n' +
            '.section-title { font-size: 9pt; font-weight: 900; color: #ffffff; background: #000000; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 8px; margin-bottom: 8px; border-left: 5px solid #97d22a; }\n' +

            /* ---- DATA TABLE ---- */
            '.data-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; margin-bottom: 4px; }\n' +
            '.data-table td { padding: 4px 8px; border-bottom: 1px solid #DEDEDE; vertical-align: top; }\n' +
            '.data-table td.lbl { color: #555; font-weight: 700; text-transform: uppercase; font-size: 8pt; letter-spacing: 0.3px; width: 38%; white-space: nowrap; }\n' +
            '.data-table td.val { color: #000; font-weight: 400; }\n' +

            /* ---- FINANCIAL TABLE ---- */
            '.fin-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }\n' +
            '.fin-table td { padding: 5px 8px; border-bottom: 1px solid #DEDEDE; }\n' +
            '.fin-table td.lbl { color: #333; }\n' +
            '.fin-table td.val { text-align: right; font-weight: 700; }\n' +
            '.fin-table td.val.green { color: #5a8a00; }\n' +
            '.fin-table td.val.blue  { color: #017eff; }\n' +
            '.fin-table td.val.red   { color: #cc0000; }\n' +
            '.fin-table tr.total td  { background: #000; color: #fff; border-bottom: none; font-weight: 700; font-size: 10pt; }\n' +
            '.fin-table tr.total td.val { color: #97d22a; }\n' +

            /* ---- REFERENCES TABLE ---- */
            '.ref-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }\n' +
            '.ref-table th { background: #000; color: #fff; font-weight: 700; padding: 4px 8px; text-align: left; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.5px; }\n' +
            '.ref-table td { padding: 5px 8px; border-bottom: 1px solid #DEDEDE; }\n' +
            '.ref-table tr:nth-child(even) td { background: #f9f9f9; }\n' +

            /* ---- CLAUSES ---- */
            '.clause { margin-bottom: 10px; font-size: 9.5pt; text-align: justify; line-height: 1.7; }\n' +
            '.clause-title { font-weight: 900; text-transform: uppercase; font-size: 9pt; color: #000; margin-bottom: 2px; }\n' +
            '.clause p { text-indent: 1em; }\n' +

            /* ---- SIGNATURES ---- */
            '.signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; margin-top: 36px; }\n' +
            '.sig-block { text-align: center; }\n' +
            '.sig-line { border-top: 1px solid #000; margin-top: 52px; padding-top: 5px; font-size: 9pt; line-height: 1.5; }\n' +
            '.sig-line strong { display: block; }\n' +

            /* ---- FOOTER ---- */
            '.doc-footer { margin-top: 24px; border-top: 2px solid #97d22a; padding-top: 8px; text-align: center; font-size: 7.5pt; color: #888; }\n' +
            '</style>\n</head>\n<body>\n' +

            /* HEADER */
            '<div class="header">' +
            '<div class="logo">Togo<span>Quincena</span><br/><span style="font-size:8pt;font-weight:400;color:#555;letter-spacing:0;text-transform:none;">Rapid Credit, S.A.</span></div>' +
            '<div class="header-right">' +
            '<strong>Contrato de Adelanto de Salario</strong>' +
            'Expediente N.\u00B0 ' + expediente + '<br/>' +
            'Fecha: ' + today + '<br/>' +
            'Estado: <span class="status-badge status-' + solicitud.estadoSolicitud + '">' + solicitud.estadoSolicitud + '</span>' +
            '</div>' +
            '</div>' +

            /* DOC TITLE */
            '<div class="doc-title-block">' +
            '<h1>Contrato de Adelanto de Salario</h1>' +
            '<p>Emitido en Guatemala, el ' + today + '</p>' +
            '</div>' +

            /* INTRO */
            '<p class="intro">' +
            'En la ciudad de Guatemala, el d\u00EDa ' + today + ', la empresa <strong>Rapid Credit, S.A. / QuincenaToGo</strong> ' +
            '(en adelante \u201CLA EMPRESA\u201D) y el suscrito <strong>' + fullName + '</strong>, ' +
            'portador del Documento Personal de Identificaci\u00F3n (DPI) n\u00FAmero <strong>' + solicitud.personal.dpi + '</strong> ' +
            '(en adelante \u201CEL SOLICITANTE\u201D), acuerdan celebrar el presente contrato de adelanto de salario, ' +
            'sujeto a las siguientes cl\u00E1usulas y condiciones:' +
            '</p>' +

            /* SECTION I */
            '<div class="section">' +
            '<div class="section-title">I. Identificaci\u00F3n del Solicitante</div>' +
            '<table class="data-table">' +
            '<tr><td class="lbl">Nombre completo</td><td class="val">' + fullName + '</td></tr>' +
            '<tr><td class="lbl">DPI</td><td class="val">' + solicitud.personal.dpi + '</td></tr>' +
            '<tr><td class="lbl">Tel\u00E9fono</td><td class="val">' + solicitud.personal.phone + '</td></tr>' +
            '<tr><td class="lbl">Correo electr\u00F3nico</td><td class="val">' + solicitud.personal.email + '</td></tr>' +
            '<tr><td class="lbl">Lugar de trabajo</td><td class="val">' + solicitud.personal.workName + '</td></tr>' +
            '<tr><td class="lbl">Direcci\u00F3n laboral</td><td class="val">' + solicitud.personal.addressWork + '</td></tr>' +
            '</table>' +
            '</div>' +

            /* SECTION II */
            '<div class="section">' +
            '<div class="section-title">II. Condiciones Financieras del Adelanto</div>' +
            '<table class="fin-table">' +
            '<tr><td class="lbl">Monto solicitado</td><td class="val blue">' + montoSolicitado + '</td></tr>' +
            '<tr><td class="lbl">Gastos legales y administrativos</td><td class="val red">- ' + gastos + '</td></tr>' +
            '<tr><td class="lbl">Monto neto a depositar al solicitante</td><td class="val green">' + montoDepositar + '</td></tr>' +
            '<tr class="total"><td class="lbl">Total a reembolsar</td><td class="val">' + montoReembolsar + '</td></tr>' +
            '</table>' +
            '<p style="font-size:8pt;color:#555;margin-top:5px;">* El dep\u00F3sito ser\u00E1 realizado en la cuenta bancaria indicada por EL SOLICITANTE. El reembolso deber\u00E1 efectuarse en la fecha de corte quincenal o mensual acordada.</p>' +
            '</div>' +

            /* SECTION III - REFERENCES */
            '<div class="section">' +
            '<div class="section-title">III. Referencias</div>' +
            '<table class="ref-table">' +
            '<thead><tr><th>Nombre</th><th>Tipo</th><th>Tel\u00E9fono</th></tr></thead>' +
            '<tbody>' + referencesHtml + '</tbody>' +
            '</table>' +
            '</div>' +

            /* SECTION IV - CLAUSES */
            '<div class="section">' +
            '<div class="section-title">IV. Cl\u00E1usulas y Condiciones</div>' +

            '<div class="clause">' +
            '<div class="clause-title">Primera \u2014 Objeto</div>' +
            '<p>El presente contrato tiene por objeto formalizar el adelanto de salario por el monto descrito en la Secci\u00F3n II, otorgado por LA EMPRESA a favor de EL SOLICITANTE, quien declara destinar dichos recursos a sus necesidades personales.</p>' +
            '</div>' +

            '<div class="clause">' +
            '<div class="clause-title">Segunda \u2014 Reembolso</div>' +
            '<p>EL SOLICITANTE se obliga a reembolsar a LA EMPRESA el monto total indicado como \u201CTotal a reembolsar\u201D en la fecha de su pr\u00F3ximo corte de salario quincenal o mensual. El incumplimiento de pago podr\u00E1 generar cargos adicionales conforme a la legislaci\u00F3n guatemalteca vigente.</p>' +
            '</div>' +

            '<div class="clause">' +
            '<div class="clause-title">Tercera \u2014 Aceptaci\u00F3n y Veracidad de la Informaci\u00F3n</div>' +
            '<p>Al momento de presentar su solicitud de adelanto, EL SOLICITANTE declara que toda la informaci\u00F3n proporcionada es ver\u00EDdica y autoriza a LA EMPRESA a verificarla por los medios que considere necesarios. La informaci\u00F3n enviada ser\u00E1 utilizada para procesar la solicitud y formar parte de los registros internos de QuincenaToGo, siendo tratada como confidencial y clasificada como \u201CInformaci\u00F3n Privada\u201D del solicitante.</p>' +
            '</div>' +

            '<div class="clause">' +
            '<div class="clause-title">Cuarta \u2014 Consentimiento de Datos Personales</div>' +
            '<p>Bajo juramento de Ley, EL SOLICITANTE manifiesta expresamente su consentimiento para que <strong>Rapid Credit, S.A. / QuincenaToGo</strong> pueda consultar, almacenar, distribuir, difundir o comercializar los datos personales de los que tuviera conocimiento y que hubiera recabado derivado de la presente gesti\u00F3n crediticia.</p>' +
            '<p style="text-indent:1em;margin-top:4px;">Asimismo, EL SOLICITANTE autoriza a LA EMPRESA a realizar el proceso de investigaci\u00F3n de su informaci\u00F3n financiera y personal ante los bur\u00F3s de referencias crediticias de la Superintendencia de Bancos, as\u00ED como cualquier otro bur\u00F3 estatal, privado, interno y externo disponible, incluyendo a <strong>Trans Union Guatemala, S.A.</strong> y sus filiales nacionales y/o extranjeras.</p>' +
            '<p style="text-indent:1em;margin-top:4px;">Adicionalmente, EL SOLICITANTE autoriza expresamente a los bur\u00F3s de la Superintendencia de Bancos, de la Rep\u00FAblica de Guatemala, y otras entidades privadas como bur\u00F3s de cr\u00E9dito incluyendo a <strong>Trans Union Guatemala, S.A.</strong> y sus filiales, para que puedan consultar, difundir, distribuir o comercializar los datos personales contenidos en sus sistemas de informaci\u00F3n, de conformidad con el art\u00EDculo 31 del Decreto Ley No. 57-2008, Ley de Acceso a la Informaci\u00F3n.</p>' +
            '</div>' +

            '<div class="clause">' +
            '<div class="clause-title">Quinta \u2014 Legislaci\u00F3n Aplicable y Jurisdicci\u00F3n</div>' +
            '<p>El presente contrato se rige por las leyes de la Rep\u00FAblica de Guatemala. Para cualquier controversia derivada de su interpretaci\u00F3n o ejecuci\u00F3n, las partes se someten expresamente a la jurisdicci\u00F3n de los tribunales competentes de la ciudad de Guatemala, renunciando a cualquier otro fuero que pudiera corresponderles.</p>' +
            '</div>' +

            '</div>' + /* end section IV */

            /* SIGNATURES */
            '<div class="signatures">' +
            '<div class="sig-block">' +
            '<div class="sig-line">' +
            '<strong>' + fullName + '</strong>' +
            'EL SOLICITANTE<br/>' +
            'DPI: ' + solicitud.personal.dpi +
            '</div>' +
            '</div>' +
            '<div class="sig-block">' +
            '<div class="sig-line">' +
            '<strong>Representante Autorizado</strong>' +
            'Rapid Credit, S.A. / QuincenaToGo<br/>' +
            'Sello y Firma' +
            '</div>' +
            '</div>' +
            '</div>' +

            /* FOOTER */
            '<div class="doc-footer">' +
            'Rapid Credit, S.A. / QuincenaToGo &nbsp;&mdash;&nbsp; Contrato de Adelanto de Salario &nbsp;&mdash;&nbsp; Expediente N.\u00B0 ' + expediente + ' &nbsp;&mdash;&nbsp; ' + today + '<br/>' +
            'Este documento tiene validez legal \u00FAnicamente con las firmas y sellos originales de ambas partes.' +
            '</div>' +

            '</body></html>';

        const win = window.open('', '_blank', 'width=900,height=700');
        if (!win) return;
        win.document.write(html);
        win.document.close();
        win.focus();
        setTimeout(() => { win.print(); }, 600);
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
            <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver
                </Button>
                <Button onClick={handlePrint} className="gap-2">
                    <Printer className="h-4 w-4" />
                    Imprimir Contrato
                </Button>
            </div>
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
                            <p className="text-3xl font-bold text-green-600">{formatCurrency(parseNumericValue(solicitud.salary))}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Monto Solicitado</p>
                            <p className="text-3xl font-bold text-blue-600">{formatCurrency(parseNumericValue(solicitud.amountRequested))}</p>
                        </div>
                    </div>

                    {calculateFinancials(solicitud.salary, solicitud.amountRequested) && (
                        <div className="border-t pt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-3">Cálculo de Adelanto</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Monto máximo que podríamos otorgar:</span>
                                    <span className="text-lg font-bold text-[#90C928]">
                                        {formatCurrency(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.max)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">Monto solicitado por el cliente:</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {formatCurrency(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.requested)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center text-red-500">
                                    <span className="text-sm">Gastos legales:</span>
                                    <span className="font-semibold">
                                        -{formatCurrency(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.gastos)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-700">Se depositará:</span>
                                    <span className="text-lg font-bold text-[#90C928]">
                                        {formatCurrency(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.deposit)}
                                    </span>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Deberá pagar:</span>
                                    <span className="font-semibold text-gray-700">
                                        {formatCurrency(calculateFinancials(solicitud.salary, solicitud.amountRequested)!.toPay)}
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
