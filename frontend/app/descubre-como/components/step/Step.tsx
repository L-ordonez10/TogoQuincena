import * as React from 'react'
import { ArrowDown } from 'lucide-react'

type StepProps = {
    index: number
    title: string
    description?: React.ReactNode
    isLast?: boolean
}

export default function Step({ index, title, description, isLast }: StepProps) {
    return (
        <div className="
    bg-white 
    transition-all duration-500 
    flex justify-center items-start gap-16 group
   bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_100%)]
    hover:bg-[radial-gradient(circle,#F8F8F8_0%,white_100%)]
">
            <div className="flex flex-col items-center flex-none">
                <div className="size-32 rounded-full bg-white flex items-center justify-center text-center font-semibold shadow-[0px_4px_4px_0px_#00000040] ">
                    <div className="flex flex-col items-center justify-center leading-none">
                        <span className="text-3xl font-bold  transition-colors duration-300 group-hover:text-[#017EFF]">Paso</span>
                        <span className="text-3xl font-bold mt-1 transition-colors duration-300 group-hover:text-[#017EFF]">{index}</span>
                    </div>
                </div>

                {!isLast ? (
                    <div className="my-12 transition-colors duration-300">
                        <ArrowDown className="text-[#95CF29] group-hover:text-[#017EFF] transition-colors duration-300" strokeWidth={3} size={48} />
                    </div>
                ) : (
                    <div className="mt-8 w-px h-6" />
                )}
            </div>

            <div className="flex-1 transition-colors duration-300 group-hover:text-[#95CF29]">
                <h3 className="max-w-xs  text-2xl md:text-4xl font-extrabold leading-tight text-black transition-colors duration-300 group-hover:text-[#95CF29]">{title}</h3>
                {description && <div className="mt-3 text-base md:text-xl text-black">{description}</div>}
            </div>
        </div>
    )
}
