import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { encryptId } from "@/lib/encryption";
import { Solicitud } from "@/lib/types/solicitudes";
import { Calendar, CreditCard, Eye, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaMoneyBill } from "react-icons/fa6";

type CardApplicationProps = {
    solicitud: Solicitud;
};

export function CardApplication({ solicitud }: CardApplicationProps) {
    const router = useRouter();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: string) => {
        const num = parseInt(amount.replace(/[^\d]/g, ''));
        if (isNaN(num)) return amount;
        return new Intl.NumberFormat('es-GT', {
            style: 'currency',
            currency: 'GTQ',
            notation: 'compact'
        }).format(num);
    };

    const handleViewDetails = () => {
        const encryptedId = encryptId(solicitud.id);
        router.push(`/dashboard/solicitud/${encryptedId}`);
    };

    const getFullName = () => {
        const names = solicitud.personal.names
        const surnames = solicitud.personal.surnames

        return `${names} ${surnames}`;
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group" onClick={handleViewDetails}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <CardTitle className="text-base font-semibold leading-none mb-1">
                                {getFullName()}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                                DPI: {solicitud.personal.dpi}
                            </CardDescription>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4 shrink-0" />
                    <span className="truncate">{solicitud.personal.email}</span>
                </div>

                {/* Fecha de solicitud */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>Solicitud: {formatDate(solicitud.fechaSolicitud)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="truncate">{solicitud.personal.phone}</span>
                </div>


                {/* Monto */}
                <div className="flex items-center gap-2">
                    <FaMoneyBill className="size-5 shrink-0 text-green-600" />
                    <div>
                        <span className="text-lg font-bold text-green-600">
                            {formatCurrency(solicitud.salary)}
                        </span>
                        <p className="text-xs text-gray-500">Salario</p>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-3">
                <Button
                    className="w-full bg-[#97D22A] hover:bg-[#017EFF] group-hover:bg-[#017EFF] transition-colors"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails();
                    }}
                >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver detalles completos
                </Button>
            </CardFooter>
        </Card>
    );
}
