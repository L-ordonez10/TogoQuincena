import Image from "next/image";
import { FaUserFriends, FaHandshake, FaBuilding, FaMoneyBillWave } from "react-icons/fa";

export default function Home() {
  return (
    <>
      {/* Banner principal */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between bg-white overflow-hidden">
        <div className="absolute inset-0 flex justify-end">
          <Image
            src="/imagenes/buying-ginger-2025-02-11-13-59-05-utc.webp"
            alt="Madre e hija en supermercado"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[650px] px-6 md:px-16 py-20 lg:py-40 text-left">
          <h1 className="text-[#97D22A] text-[25px] md:text-[40px] lg:text-[75px] font-bold leading-tight">
            Tu quincena, sin esperar<br />la quincena
          </h1>

          <div className="mt-8 flex flex-col gap-4">
            <button className="w-auto self-start bg-[#97D22A] text-white px-6 py-3 rounded-md font-semibold text-[27px] shadow-md hover:opacity-90 transition cursor-pointer">
              Solicitar adelanto
            </button>
            <button className="w-auto self-start bg-white text-black px-6 py-3 rounded-md font-semibold text-[22px] shadow hover:bg-gray-50 transition cursor-pointer">
              Quiero saber más
            </button>
          </div>
        </div>
      </section>

      {/* Sección: Sobre nosotros */}
      <section className="bg-white text-black py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-10">
          
          <div className="text-left flex items-start justify-start">
            <h2 className="text-2xl md:text-[40px] font-semibold">Sobre nosotros</h2>
          </div>

          <div className="text-left">
            <p className="text-[18px] md:text-[24px] leading-relaxed mb-4">
              <span className="font-semibold text-[#017EFF]">
                QuincenaToGo es un adelanto de salario confiable
              </span>
              , sin necesidad de moverte de tu oficina.
            </p>
            <p className="text-[18px] md:text-[24px] leading-relaxed mb-6">
              Está diseñado para trabajadoras formales que necesitan resolver
              situaciones inesperadas antes de recibir su próxima quincena.
              Ofrece una plataforma digital amigable para gestionar el proceso
              en línea.
            </p>
            <button className="bg-[#017EFF] text-white px-6 py-3 rounded-md font-medium hover:opacity-90 cursor-pointer shadow-md">
              Ver más
            </button>
          </div>
        </div>
      </section>

     {/* Sección: ¿Por qué elegir QuincenaToGo? */}

     <section
  className="text-center text-black py-20 px-6 md:px-20 bg-cover bg-center bg-no-repeat relative overflow-hidden mb-10"
  style={{ backgroundImage: "url('/imagenes/botonesQ2.webp')" }}
>
  <h2 className="relative text-2xl md:text-[30px] lg:text-[40px] font-bold mb-14">
    ¿Por qué elegir QuincenaToGo?
  </h2>

  <div className="w-full max-w-6xl mx-auto">
    <Image
      src="/imagenes/botonesQ1.webp"
      alt="Sin endeudamiento bancario"
      width={1200}
      height={600}
      className="w-full h-auto object-contain"
    />
  </div>
</section>


<section className="bg-white text-black py-16 px-4 sm:px-8 md:px-16 lg:px-20">
  {/* Título centrado */}
  <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold mb-12 text-center">
    ¿Cómo funciona?
  </h2>

  {/* Contenido responsive */}
  <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
    {/* Imagen izquierda */}
    <div className="w-full lg:w-1/2 flex justify-center">
      <Image
        src="/imagenes/botonesQ3.webp"
        alt="Pasos del proceso"
        width={600}
        height={400}
        className="object-cover w-full max-w-[500px] rounded-md"
      />
    </div>

    {/* Imagen derecha + botón */}
    <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
      <Image
        src="/imagenes/pasos.webp"
        alt="Pasos del proceso"
        width={600}
        height={500}
        className="w-full max-w-[500px] h-auto object-contain"
      />

      <button className="mt-6 sm:mt-8 bg-[#017EFF] hover:bg-[#006EE6] text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-md transition text-[16px] sm:text-[18px]">
        Ver más
      </button>
    </div>
  </div>
</section>




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

    </>
  );
}

