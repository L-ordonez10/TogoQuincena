"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  titulo: string
  subtitulo?: string
  contenido: (string | { titulo: string; subitems: string[] })[]
}

interface SliderInfoProps {
  slides: Slide[]
}

export default function SliderInfo({ slides }: SliderInfoProps) {
  const [index, setIndex] = useState(0)

  const nextSlide = () => setIndex((index + 1) % slides.length)
  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length)

  const slide = slides[index]

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 md:px-0">
      {/* Título */}
      <h2 className="text-xl sm:text-3xl md:text-[50px] font-bold mb-2 leading-tight">
        {slide.titulo}
      </h2>

      {/* Subtítulo */}
      {slide.subtitulo && (
        <h3 className="text-[#97D22A] text-lg sm:text-2xl md:text-[40px] font-semibold mb-6 leading-snug">
          {slide.subtitulo}
        </h3>
      )}

      {/* Contenedor del slider */}
      <div className="relative flex items-center justify-center w-full max-w-3xl">
        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          className="absolute left-0 sm:left-[-2rem] md:left-[-4rem] text-[#97D22A] hover:scale-110 transition"
        >
          <ChevronLeft size={40} className="sm:hidden" />
          <ChevronLeft size={60} className="hidden sm:inline md:hidden" />
          <ChevronLeft size={75} className="hidden md:inline" />
        </button>

        {/* Contenido */}
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 md:p-10 text-left leading-relaxed w-full mx-2 sm:mx-4">
          <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 text-gray-800 text-[14px] sm:text-[18px] md:text-[22px] marker:text-[#97D22A]">
            {slide.contenido.map((item, i) => (
              <li key={i}>
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    <span className="font-semibold">{item.titulo}</span>
                    <ul className="list-disc pl-6 sm:pl-8 mt-1 sm:mt-2 space-y-1 sm:space-y-2 marker:text-[#97D22A]">
                      {item.subitems.map((sub, j) => (
                        <li key={j}>{sub}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          className="absolute right-0 sm:right-[-2rem] md:right-[-4rem] text-[#97D22A] hover:scale-110 transition"
        >
          <ChevronRight size={40} className="sm:hidden" />
          <ChevronRight size={60} className="hidden sm:inline md:hidden" />
          <ChevronRight size={75} className="hidden md:inline" />
        </button>
      </div>
    </div>
  )
}
