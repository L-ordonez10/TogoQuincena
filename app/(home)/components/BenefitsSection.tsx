export function BenefitsSection() {
    return (
        <section
            className="py-20 px-4 sm:px-10 md:px-16 lg:px-20 bg-cover bg-center bg-no-repeat text-black mb-16"
            style={{ backgroundImage: "url('/imagenes/botonesQ2.webp')" }}
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Texto izquierdo */}
                <div className="w-full lg:w-1/3 text-center lg:text-left flex flex-col justify-center">
                    <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold mb-4 leading-tight">
                        Únete a QuincenaToGo <br /> y disfruta todos los beneficios.
                    </h2>
                    <p className="text-white font-medium text-[18px] sm:text-[20px] leading-snug">
                        Adelanto de salario sin salir de tu oficina.
                    </p>
                </div>

                {/* Tarjetas */}
                <div className="w-full lg:w-2/3 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-end gap-6">
                    {/* Tarjeta 1 */}
                    <div className="bg-white rounded-xl shadow-md px-6 py-8 w-full sm:w-[250px] text-center flex flex-col justify-center">
                        <p className="text-gray-700 text-[16px] sm:text-[18px] font-semibold mb-2">
                            Adelanto de hasta:
                        </p>
                        <p className="text-[#97D22A] text-[26px] sm:text-[28px] font-bold mb-1">
                            20% del salario
                        </p>
                        <p className="text-gray-600 text-[12px] sm:text-[13px] font-medium">
                            Mínimo Q.500.00 y máximo Q.1,500.00
                        </p>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-white rounded-xl shadow-md px-6 py-8 w-full sm:w-[250px] text-center flex flex-col justify-center">
                        <p className="text-gray-700 text-[16px] sm:text-[18px] font-semibold mb-2">
                            Mediante:
                        </p>
                        <p className="text-[#97D22A] text-[26px] sm:text-[28px] font-bold leading-tight">
                            Transferencia bancaria
                        </p>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-white rounded-xl shadow-md px-6 py-8 w-full sm:w-[250px] text-center flex flex-col justify-center">
                        <p className="text-gray-700 text-[16px] sm:text-[18px] font-semibold mb-2">
                            Depósito en:
                        </p>
                        <p className="text-[#97D22A] text-[26px] sm:text-[28px] font-bold mb-1 leading-tight">
                            24 horas
                        </p>
                        <p className="text-gray-600 text-[12px] sm:text-[13px] font-medium">
                            después de haber firmado tu pagaré.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    )
}

