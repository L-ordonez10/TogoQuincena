'use client'
import Image from "next/image"
import VideoPlayer from "@/components/VideoPlayer"
import Link from "next/link"

export function HowItWorksSection() {
    return (
        <section className="bg-white text-black py-16 px-4 sm:px-8 md:px-16 lg:px-20" aria-labelledby="how-it-works-heading">
            <h2 id="how-it-works-heading" className="text-[28px] sm:text-[34px] md:text-[40px] font-bold mb-12 text-center">
                ¿Cómo funciona?
            </h2>

            <div className="max-w-368 w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
                {/* LEFT: pasos */}
                <article className="w-full lg:w-1/2">
                    <figure className="relative">
                        <Image
                            src="/imagenes/botonesQ3.webp"
                            alt="Proceso de solicitud en 3 pasos: 1. Llena el formulario, 2. Espera la aprobación, 3. Recibe tu dinero"
                            width={600}
                            height={400}
                            className="object-cover w-full max-w-[500px] rounded-md"
                        />
                    </figure>

                    <nav className="mt-8 flex justify-center lg:justify-end">
                        <Link
                            href="/descubre-como"
                            className="bg-[#017EFF] hover:bg-[#006EE6] text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-md transition text-[16px] sm:text-[18px]"
                            aria-label="Descubrir cómo funciona el proceso completo"
                        >
                            Ver más
                        </Link>
                    </nav>
                </article>

                {/* RIGHT: cuadro de video (inline, sin modal) */}
                <aside className="w-full lg:w-1/2 flex justify-center lg:justify-end" aria-label="Video demostrativo">
                    <VideoPlayer url="/imagenes/Qiuncenatogo.mp4" />
                </aside>
            </div>
        </section>
    )
}