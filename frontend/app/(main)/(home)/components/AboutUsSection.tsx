import Image from "next/image"
import Link from "next/link"

export function AboutUsSection() {
    return (
        <section className="bg-white text-black py-16 px-6 md:px-20" aria-labelledby="about-us-heading">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                <header className="lg:col-span-4 col-span-1 text-center lg:text-right">
                    <h2 id="about-us-heading" className="text-2xl md:text-[40px] hover:text-[#98D229] transition-colors duration-300 cursor-default font-bold">Sobre nosotros</h2>
                </header>

                <article className="lg:col-span-8 col-span-1 text-center lg:text-left">
                    <p className="text-[18px] md:text-[24px] leading-relaxed mb-4">
                        <strong className="font-bold text-[#017EFF]">
                            QuincenaToGo es un adelanto de salario confiable,
                        </strong>{" "}sin necesidad de moverte de tu oficina.
                    </p>
                    <p className="text-[16px] md:text-[24px] leading-relaxed mb-6">
                        Está diseñado para trabajadoras formales que necesitan resolver
                        situaciones inesperadas antes de recibir su próxima quincena.
                        Ofrece una plataforma digital amigable para gestionar el proceso
                        en línea.
                    </p>
                    <div className="flex justify-center lg:justify-start">
                        <Link 
                            href="/nosotros" 
                            className="bg-[#017EFF] hover:bg-[#000000] transition-colors duration-300 text-white px-6 py-3 text-base md:text-lg rounded-md font-bold hover:opacity-90 cursor-pointer shadow-md"
                            aria-label="Conocer más sobre QuincenaToGo"
                        >
                            Ver más
                        </Link>
                    </div>
                </article>
            </div>
        </section>
    )
}