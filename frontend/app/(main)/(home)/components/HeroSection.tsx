import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="relative flex flex-col lg:flex-row items-center justify-between bg-white overflow-hidden" aria-labelledby="hero-heading">
            <div className="absolute inset-0 flex justify-end" role="presentation">
                <Image
                    src="/imagenes/buying-ginger-2025-02-11-13-59-05-utc.webp"
                    alt=""
                    fill
                    className="object-cover object-right"
                    priority
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/60 to-transparent" aria-hidden="true"></div>
            </div>
            <article className="relative z-10 max-w-[650px] px-6 md:px-16 py-12 md:py-20 lg:py-40 text-left">
                <h1 id="hero-heading" className="text-[#97D22A] lg:max-w-[35vw] max-w-full text-[22px] md:text-[40px] lg:text-[50px] xl:text-[60px] 2xl:text-[75px] font-bold leading-tight">
                    Tu quincena, <span className="hover:text-black transition-colors duration-300">sin esperar la quincena</span>
                </h1>

                <nav className="mt-8 flex flex-col gap-4" aria-label="Acciones principales">
                    <Link
                        href="/solicita-adelanto"
                        className="w-auto self-center lg:self-start bg-[#97D22A] text-white px-6 py-3 rounded-md font-semibold text-[20px] md:text-[27px] shadow-md hover:opacity-90 transition cursor-pointer text-center"
                        aria-label="Solicitar adelanto de quincena ahora"
                    >
                        Solicitar adelanto
                    </Link>

                    <Link
                        href="/descubre-como"
                        className="w-auto self-center lg:self-start bg-white text-black px-6 py-3 rounded-md font-semibold text-[16px] md:text-[22px] shadow hover:bg-gray-50 transition cursor-pointer text-center"
                        aria-label="Descubrir cómo funciona QuincenaToGo"
                    >
                        Quiero saber más
                    </Link>
                </nav>
            </article>
        </section>
    )
}
