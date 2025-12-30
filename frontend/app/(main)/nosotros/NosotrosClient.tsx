"use client"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Target, Star, Lightbulb, ChevronDown } from "lucide-react"

export default function NosotrosClient() {
  const [openCard, setOpenCard] = useState<number | null>(null)

  // Duración de la animación (ms). Debe coincidir con "duration-500" en las clases Tailwind.
  const TRANSITION_MS = 500

  const timerRef = useRef<number | null>(null)
  const animatingRef = useRef(false)
  const searchParams = useSearchParams()
  const cardsRef = useRef<HTMLDivElement | null>(null)

  const toggleCard = (index: number) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
      animatingRef.current = false
    }

    if (openCard === index) {
      setOpenCard(null)
      return
    }

    if (openCard === null) {
      setOpenCard(index)
      return
    }

    if (openCard !== index) {
      setOpenCard(null)
      animatingRef.current = true

      timerRef.current = window.setTimeout(() => {
        setOpenCard(index)
        animatingRef.current = false
        timerRef.current = null
      }, TRANSITION_MS)
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!searchParams) return
    const tab = searchParams.get("tab")
    if (!tab) return

    const key = tab.toLowerCase()
    const mapping: Record<string, number> = {
      objetivos: 0,
      valores: 1,
      vision: 1,
      mision: 2,
    }

    const idx = mapping[key]
    if (typeof idx === "number") {
      let scrollTimer: number | null = null
      if (cardsRef.current) {
        cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        scrollTimer = window.setTimeout(() => {
          setOpenCard((prev) => (prev === idx ? prev : idx))
        }, 350)
      } else {
        setOpenCard((prev) => (prev === idx ? prev : idx))
      }

      return () => {
        if (scrollTimer) {
          window.clearTimeout(scrollTimer)
        }
      }
    }
  }, [searchParams?.toString()])

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-[50px] font-bold text-center mb-16">Nosotros</h1>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center md:justify-end">
              <div className="rounded-2xl overflow-hidden shadow-xl w-full max-w-[500px]">
                <Image
                  src="/imagenes/imgnostros.jpg"
                  alt="Profesional de QuincenaToGo"
                  width={500}
                  height={650}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 text-gray-800">
              <h2 className="text-[24px] sm:text-[28px] md:text-[40px] font-bold leading-snug text-[#97D22A]">
                “No te preocupes más,<br />
                <span className="text-[#97D22A]">Quincena</span>
                <span className="text-black font-bold">ToGo</span> está aquí”
              </h2>

              <p className="text-[18px] sm:text-[24px] leading-relaxed">
                <span className="text-[#017EFF] font-semibold">Es un adelanto de salario confiable,</span>{" "}
                sin necesidad de moverte de tu oficina.
              </p>

              <p className="text-[18px] md:text-[24px] leading-relaxed">
                Está diseñado para trabajadoras formales que necesitan resolver
                situaciones inesperadas antes de recibir su próxima quincena.
                Ofrece una plataforma digital amigable para gestionar el proceso
                en línea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
            {[
              {
                title: "Nuestros objetivos",
                icon: <Target className="text-white w-8 h-8" />,
                content: (
                  <>
                    <p className="text-[#97D22A] font-semibold">Facilitar el acceso</p>
                    <p>Acceso a adelantos de salario de forma confiable y sin trámites complejos.</p>
                    <p className="text-[#97D22A] font-semibold mt-3">Ofrecer atención</p>
                    <p>Atención personalizada por medio de WhatsApp y página web.</p>
                    <p className="text-[#97D22A] font-semibold mt-3">Generar confianza</p>
                    <p>Confianza mediante un modelo transparente, claro y empático.</p>
                  </>
                ),
              },
              {
                title: "Nuestros Valores",
                icon: <Star className="text-white w-8 h-8" />,
                content: (
                  <>
                    <p className="text-[#97D22A] font-semibold">Confianza</p>
                    <p>Estamos cuando más nos necesitas.</p>
                    <p className="text-[#97D22A] font-semibold mt-3">Transparencia</p>
                    <p>Nada escondido, todo claro.</p>
                    <p className="text-[#97D22A] font-semibold mt-3">Seguridad</p>
                    <p>Seguridad de todos sus datos.</p>
                  </>
                ),
              },
              {
                title: "Nuestra Misión",
                icon: <Lightbulb className="text-white w-8 h-8" />,
                content: (
                  <p>
                    Ofrecer soluciones financieras accesibles y ágiles a mujeres trabajadoras del sector
                    formal que necesitan adelantos de salario, brindando confianza, transparencia y
                    opciones de pago flexibles que se adapten a sus necesidades. Sin tener que salir de su oficina.
                  </p>
                ),
              },
            ].map((card, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (animatingRef.current) return
                  toggleCard(index)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    if (animatingRef.current) return
                    toggleCard(index)
                  }
                }}
                aria-expanded={openCard === index}
                className={`bg-white shadow-lg rounded-xl text-center p-6 border transition-all duration-300 self-start cursor-pointer ${
                  openCard === index ? "border-[#017EFF]" : "border-gray-100"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-[#97D22A] rounded-full w-16 h-16 flex items-center justify-center shadow-md -mt-10 mb-4">
                    {card.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openCard === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="text-left text-[16px] leading-relaxed px-2 sm:px-4 pt-3">
                      {card.content}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (animatingRef.current) return
                      toggleCard(index)
                    }}
                    className="mt-4 text-[#017EFF] hover:text-blue-600 transition transform hover:scale-110"
                    aria-expanded={openCard === index}
                    aria-controls={`card-content-${index}`}
                  >
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-500 ${
                        openCard === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
