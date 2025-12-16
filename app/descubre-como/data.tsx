export const contentItems = [
    {
        id: 'requisitos',
        title: 'Requisitos para hacer tu solicitud',
        content: (
            <div>
                <ul className="list-none p-0 m-0">
                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Edad mínima 23 años.</span>
                    </li>

                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Tener empleo activo (mínimo 6 meses de antigüedad).</span>
                    </li>

                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Trabajar en oficina en una de las siguientes zonas: 4, 9, 10, 13, 14, de la Ciudad de Guatemala.</span>
                    </li>
                </ul>

                <div className="mt-2 ml-7">
                    <p className="font-semibold mb-2 text-lg sm:text-xl md:text-2xl">Presentar:</p>

                    <ul className="list-disc pl-6 text-base sm:text-lg md:text-xl lg:text-2xl">
                        <li className="mb-2">DPI vigente y en buen estado.</li>
                        <li className="mb-2">Estar en planilla y recibir tu salario en una cuenta bancaria a tu nombre.</li>
                        <li className="mb-2">Agregar recibo de energía eléctrica de tu residencia del mes anterior.</li>
                        <li className="mb-2">Estado de cuenta bancario de los últimos 2 meses donde se refleje el pago de la quincena (4).</li>
                    </ul>
                </div>
            </div>
        ),
    },
    {
        id: 'monto',
        title: 'Monto del adelanto',
        content: (
            <div>
                <ul className="list-none p-0 m-0">
                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Adelanto máximo: 20% del salario neto.</span>
                    </li>

                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Adelanto mínimo: Q500.</span>
                    </li>

                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Adelanto máximo: Q1,500.</span>
                    </li>
                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Comisión por servicio: del 10% al 15% dependiendo del monto del crédito. Esta comisión se
                            descuenta en el momento del desembolso.
                        </span>
                    </li>
                </ul>
            </div>
        )
    },
    {
        id: 'control',
        title: 'Control y seguridad',
        content: (
            <div>
                <ul className="list-none p-0 m-0">
                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Contrato en términos claros y firma de consentimiento. </span>
                    </li>

                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Política de uso responsable del servicio.</span>
                    </li>

                    <li className="flex items-start mb-4">
                        <span className="w-3 h-3 rounded-full bg-[#97D22A] mt-2 mr-4 shrink-0" />
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl">Validación por código en mensaje de WhatsApp o correo electrónico.</span>
                    </li>
                </ul>
            </div>
        )
    },
    {
        id: "cancelacion",
        title: " Forma de cancelar el adelanto",
        content: (
            <div className="space-y-6">
                <h3 className="font-bold text-lg sm:text-xl md:text-2xl text-[#017EFF]">Depósito o transferencia bancaria</h3>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    El cliente puede cancelar el total del monto a pagar directamente a  la cuenta que QuincenaToGo te indique,
                    antes o en la fecha acordada.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    Transferencias a terceros desde tu cuenta en Banco Industrial.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    Transferencias ACH si tu cuenta es de cualquier otro Banco.
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    Depósito físico en Agencias de Banco Industrial  o en Agentes BI.
                </p>
            </div>
        )
    }
]