"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  titulo: string
  subtitulo?: string
  contenido: string[]
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
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{slide.titulo}</h2>
      {slide.subtitulo && (
        <h3 className="text-[#97D22A] text-xl md:text-2xl font-semibold mb-6">
          {slide.subtitulo}
        </h3>
      )}

      <div className="relative flex items-center justify-center w-full max-w-3xl">
        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          className="absolute left-[-2rem] md:left-[-4rem] text-[#97D22A] hover:scale-110 transition"
        >
          <ChevronLeft size={75} />
        </button>

        {/* Contenido */}
        <div className="bg-white shadow-md rounded-xl p-6 md:p-10 text-left leading-relaxed">
          <ul className="list-disc pl-6 space-y-3 text-gray-800">
            {slide.contenido.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          className="absolute right-[-2rem] md:right-[-4rem] text-[#97D22A] hover:scale-110 transition"
        >
          <ChevronRight size={75} />
        </button>
      </div>
    </div>
  )
}
