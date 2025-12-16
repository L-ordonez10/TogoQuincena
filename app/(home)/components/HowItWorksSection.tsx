'use client'
import Image from "next/image"
import VideoPlayer from "@/components/VideoPlayer"
import Link from "next/link"

export function HowItWorksSection() {
    return (
        <section className="bg-white text-black py-16 px-4 sm:px-8 md:px-16 lg:px-20">
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold mb-12 text-center">
                ¿Cómo funciona?
            </h2>

            <div className="max-w-368 w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
                {/* LEFT: pasos */}
                <div className="w-full lg:w-1/2">
                    <div className="relative">
                        <Image
                            src="/imagenes/botonesQ3.webp"
                            alt="Pasos del proceso"
                            width={600}
                            height={400}
                            className="object-cover w-full max-w-[500px] rounded-md"
                        />

                        <div className="mt-8 flex justify-center lg:justify-end">
                            <Link
                                href="/nosotros"
                                className="bg-[#017EFF] hover:bg-[#006EE6] text-white font-semibold px-6 sm:px-8 py-3 rounded-lg shadow-md transition text-[16px] sm:text-[18px]"
                                aria-label="Ver más sobre cómo funciona"
                            >
                                Ver más
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RIGHT: cuadro de video (inline, sin modal) */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <VideoPlayer url="/imagenes/Qiuncenatogo.mp4" />
                </div>
            </div>
        </section>
    )
}