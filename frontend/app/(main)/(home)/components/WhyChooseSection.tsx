import Image from "next/image"

export function WhyChooseSection() {
    return (
        <section 
            className=" bg-[url(/imagenes/botonesQ2.webp)] bg-cover text-center text-black py-12 md:py-20 2xl:py-30 px-6 md:px-20 bg-center bg-no-repeat relative overflow-hidden mb-10"
            aria-labelledby="why-choose-heading"
        >
            <h2 id="why-choose-heading" className="relative text-xl md:text-[30px] lg:text-[40px] font-bold mb-10 md:mb-14">
                ¿Por qué elegir QuincenaToGo?
            </h2>

            <figure className="w-full max-w-6xl mx-auto px-4">
                <Image
                    src="/imagenes/botonesQ1.webp"  
                    alt="Beneficios de QuincenaToGo: Sin endeudamiento bancario, servicio al cliente 24/7, proceso 100% digital y sin complicaciones"
                    width={1200}
                    height={600}
                    className="w-full h-auto object-contain mx-auto"
                />
            </figure>
        </section>
    )
}
