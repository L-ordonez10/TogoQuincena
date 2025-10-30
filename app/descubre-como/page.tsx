import SliderInfo from "@/components/SliderInfo"

const slides = [
  {
    titulo: "Descubre ¿cómo?",
    subtitulo: "Requisitos para hacer tu solicitud",
    contenido: [
      "Edad mínima 23 años.",
      "Tener empleo activo (mínimo 6 meses de antigüedad).",
      "Trabajar en oficina en zonas 4, 9, 10, 13, 14, de la Ciudad de Guatemala.",
      {
        titulo: "Presentar:",
        subitems: [
          "DPI vigente y en buen estado.",
          "Estar en planilla y recibir tu salario en una cuenta bancaria a tu nombre.",
          "Agregar recibo de energía eléctrica de tu residencia del mes anterior.",
          "Estado de cuenta bancario de los últimos 2 meses donde se refleje el pago de la quincena.",
        ],
      },
    ],
  },
  {
    titulo: "Descubre ¿cómo?",
    subtitulo: "Monto del adelanto",
    contenido: [
      "Adelanto máximo: 20% del salario neto.",
      "Anticipo mínimo: Q500.",
      "Anticipo máximo: Q1,500.",
      "Comisión por servicio: del 10% al 15% dependiendo del monto del crédito. Esta comisión se descuenta en el momento del desembolso.",
    ],
  },
]

export default function DescubreComoPage() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <SliderInfo slides={slides} />
      </div>
    </section>
  )
}
