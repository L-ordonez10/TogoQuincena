"use client"
import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import type { CarouselApi } from '@/components/ui/carousel'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { contentItems } from "../data"

export function DiscoverHowSection() {
    const [activeIndex, setActiveIndex] = useState(0)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])
    const containerRef = useRef<HTMLDivElement | null>(null)
    const count = contentItems.length
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
    const [heights, setHeights] = useState<number[]>([])
    const searchParams = useSearchParams()

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        const idx = itemRefs.current.findIndex((el) => el === entry.target)
                        if (idx !== -1) setActiveIndex(idx)
                    }
                })
            },
            { root: containerRef.current, threshold: [0.5] }
        )

        itemRefs.current.forEach((el) => el && observer.observe(el))
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        const setHeight = () => {
            const el = itemRefs.current[activeIndex]
            const height = el ? `${el.getBoundingClientRect().height}px` : (heights[activeIndex] ? `${heights[activeIndex]}px` : 'auto')
            containerRef.current!.style.transition = 'height 300ms ease'
            containerRef.current!.style.height = height
        }


        setHeight()
        window.addEventListener('resize', setHeight)
        return () => window.removeEventListener('resize', setHeight)
    }, [activeIndex, count])

    useEffect(() => {
        const computeHeights = () => {
            const newHeights = itemRefs.current.map((el) => (el ? Math.ceil(el.getBoundingClientRect().height) : 0))
            setHeights(newHeights)
            if (containerRef.current && typeof newHeights[activeIndex] === 'number') {
                containerRef.current.style.height = `${newHeights[activeIndex]}px`
            }
        }


        requestAnimationFrame(computeHeights)
        window.addEventListener('resize', computeHeights)
        return () => window.removeEventListener('resize', computeHeights)
    }, [count, activeIndex])

    // Si viene ?section=... navegamos al slide correspondiente
    useEffect(() => {
        if (!searchParams) return
        const section = searchParams.get('section')
        if (!section) return

        const key = section.toLowerCase()
        const mapping: Record<string, number> = {
            requisitos: 0,
            monto: 1,
            control: 2,
            cancelacion: 3,
        }

        const idx = mapping[key]
        if (typeof idx === 'number' && idx >= 0 && idx < contentItems.length) {
            // scroll container into view
            if (containerRef.current) {
                containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }

            // si la API del carousel está lista, pedir scrollTo; si no, esperar
            if (carouselApi) {
                carouselApi.scrollTo(idx)
                setActiveIndex(idx)
            } else {
                const t = window.setTimeout(() => {
                    (carouselApi as CarouselApi | null)?.scrollTo(idx)
                    setActiveIndex(idx)
                }, 300)
                return () => window.clearTimeout(t)
            }
        }
    }, [searchParams?.toString(), carouselApi])

    return (
        <section className="w-full py-12 px-4 ">
            <div className="w-full max-w-6xl mx-auto my-12">
                <h1 className="hover:text-[#97D22A] transition-colors duration-200 text-xl sm:text-3xl md:text-[40px] text-center font-bold mb-2 leading-tight ">
                    Descubre ¿Cómo?
                </h1>
                <h2 className="text-[#97D22A] text-xl sm:text-2xl text-center md:text-[30px] font-bold mb-6 leading-snug">
                    {contentItems[activeIndex]?.title ?? "Requisitos para hacer tu solicitud"}
                </h2>

                <div className="mt-5 w-full max-w-4xl mx-auto">
                    <Carousel opts={{ loop: true }} setApi={(api: CarouselApi) => setCarouselApi(api)} className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] rounded-2xl p-6">
                        <div ref={containerRef} className="overflow-hidden">
                            <CarouselContent>
                                {contentItems.map((item, idx) => (
                                    <CarouselItem key={item.id}>
                                        <div ref={(el) => { itemRefs.current[idx] = el }}>
                                            <Card className="border-none shadow-none max-w-5xl mx-auto">
                                                <CardContent>{item.content}</CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </div>
                        <CarouselPrevious
                            className="text-[#97D22A]"
                            onClick={() => {
                                const prev = (activeIndex - 1 + count) % count
                                const targetH = heights[prev]
                                if (containerRef.current && typeof targetH === 'number' && targetH > 0) {
                                    containerRef.current.style.transition = 'height 300ms ease'
                                    containerRef.current.style.height = `${targetH}px`
                                }
                                carouselApi?.scrollPrev()
                                setActiveIndex(prev)
                            }}
                        />
                        <CarouselNext
                            className="text-[#97D22A]"
                            onClick={() => {
                                const next = (activeIndex + 1) % count
                                const targetH = heights[next]
                                if (containerRef.current && typeof targetH === 'number' && targetH > 0) {
                                    containerRef.current.style.transition = 'height 300ms ease'
                                    containerRef.current.style.height = `${targetH}px`
                                }
                                carouselApi?.scrollNext()
                                setActiveIndex(next)
                            }}
                        />
                    </Carousel>

                    <div className="w-full flex justify-center gap-2 py-4">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    (carouselApi as CarouselApi | null)?.scrollTo(index)
                                    setActiveIndex(index)
                                }}
                                className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${activeIndex === index ? 'bg-[#017EFF]' : 'bg-gray-300'}`}
                                aria-label={`Ir a la imagen ${index}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}