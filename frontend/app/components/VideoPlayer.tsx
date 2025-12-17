'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

type VideoPlayerProps = {
    url: string
    autoplay?: boolean
    loop?: boolean
    controls?: boolean
    /**
     * Si true, el botón overlay se ocultará cuando el video esté en reproducción.
     * (comportamiento tipo imagen con play centrado)
     */
    hideOverlayOnPlay?: boolean
}

export default function VideoPlayer({
    url,
    autoplay = false, // por defecto false para que el botón sea visible inicialmente
    loop = true,
    controls = false,
    hideOverlayOnPlay = true,
}: VideoPlayerProps) {
    const [playing, setPlaying] = useState<boolean>(autoplay)

    // Si cambias la prop autoplay después del montaje, actualizamos el estado
    useEffect(() => {
        setPlaying(autoplay)
    }, [autoplay])

    const togglePlay = () => setPlaying((p) => !p)

    return (
        <div className="bg-black rounded-2xl shadow-2xl overflow-hidden aspect-video relative">
            <ReactPlayer
                src={url}
                width="100%"
                height="100%"
                playing={playing}
                muted={true} // necesario para autoplay en la mayoría de navegadores
                loop={loop}
                controls={controls}
                playsInline={true}

            />

            {/* Overlay centrado con botón personalizado */}
            {/* FIX: "absolute inset-0" (antes faltaba el espacio => no se posicionaba) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-pressed={playing}
                    aria-label={playing ? 'Pausar video' : 'Reproducir video'}
                    className={
                        // pointer-events-auto por defecto; si hideOverlayOnPlay es true y está reproduciendo, lo ocultamos
                        `z-50 pointer-events-auto bg-white/95 hover:bg-white rounded-full shadow-lg w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-all duration-200 ease-out
            focus:outline-none focus:ring-4 focus:ring-white/60
            ${hideOverlayOnPlay && playing ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`
                    }
                >
                    {/* Si está reproduciendo, mostramos icono PAUSE; si no, icono PLAY.
              NOTA: colores contrastados (iconos negros sobre fondo blanco). */}
                    {playing ? (
                        // Pause
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <rect x="6" y="4" width="4" height="16" rx="1" fill="#000" />
                            <rect x="14" y="4" width="4" height="16" rx="1" fill="#000" />
                        </svg>
                    ) : (
                        // Play
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M5 3v18l15-9L5 3z" fill="#000" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    )
}