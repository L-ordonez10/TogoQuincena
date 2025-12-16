import Link from "next/link"
import Step from "./Step"
import { steps } from "./data"

export function StepSection() {

    return (
        <div className="flex flex-col justify-center items-center  px-4 my-12 ">

            <h2 className="text-[#97D22A] max-w-2xl text-xl sm:text-2xl text-center md:text-[40px] font-bold mb-6 leading-snug ">
                Los pasos para realizar tu <span className="text-black">adelanto de salario</span> son:
            </h2>

            <div className="w-full max-w-xl mx-auto space-y-6 flex flex-col items-start ">
                {steps.map((s, i) => (
                    <Step
                        key={i}
                        index={i + 1}
                        title={s.title}
                        description={s.description}
                        isLast={i === steps.length - 1}
                    />
                ))}
                <Link href="/solicita-adelanto" className="bg-[#017EFF] hover:bg-[#000000] transition-colors duration-300 text-white px-6 py-3 text-base md:text-lg rounded-md font-bold hover:opacity-90 cursor-pointer shadow-md">
                    Solicitar adelanto
                </Link>
            </div>
        </div>
    )
}
