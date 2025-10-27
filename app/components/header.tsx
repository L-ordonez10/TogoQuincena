"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  // 🔹 Menú dinámico
  const menuItems = [
    { nombre: "Nosotros", ruta: "/nosotros" },
    { nombre: "Descubre cómo", ruta: "/descubre-como" },
    { nombre: "Cotizador", ruta: "/cotizador" },
  ];

  return (
    <header className="relative w-full z-50">
      {/* 🔵 Banner superior */}
      {bannerVisible && (
        <div className="relative bg-[#017EFF] text-white flex justify-center items-center py-2 sm:py-3 text-xs sm:text-sm md:text-[18px] px-4">
          <p className="text-center leading-snug">
            Obtén descuento en tu primer adelanto con código{" "}
            <span className="font-semibold">#PrimerAdelanto</span>
          </p>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 font-bold text-[18px] md:text-[22px] cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ⚪ Barra principal */}
      <div className="bg-white flex flex-col md:grid md:grid-cols-[1fr_auto_auto] lg:grid-cols-[1fr_2fr_1fr] items-center md:gap-x-10 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 shadow-md relative">
        {/* Logo */}
        <div className="flex justify-between md:justify-start items-center w-full">
          <Link href="/">
            <Image
              src="/imagenes/LogoQuincenaToGo.svg"
              alt="Logo"
              width={160}
              height={50}
              className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
              priority
            />
          </Link>

          {/* Menú hamburguesa (móvil) */}
          <button
            className="flex flex-col space-y-1 md:hidden cursor-pointer"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
          >
            <span className="w-6 h-[3px] bg-black rounded"></span>
            <span className="w-6 h-[3px] bg-black rounded"></span>
            <span className="w-6 h-[3px] bg-black rounded"></span>
          </button>
        </div>

        {/* Menú centrado (escritorio) */}
        <nav className="hidden lg:flex justify-center space-x-16 xl:space-x-24 text-[18px] xl:text-[22px] text-black font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.nombre}
              href={item.ruta}
              className="hover:text-[#017EFF] transition whitespace-nowrap"
            >
              {item.nombre}
            </Link>
          ))}
        </nav>

        {/* Botón (escritorio) */}
        <div className="hidden lg:flex justify-end w-full">
          <Link
            href="/solicita-adelanto"
            className="bg-[#97D22A] text-white px-6 py-2 rounded-md font-semibold shadow-md hover:opacity-90 text-[18px] xl:text-[22px] transition"
          >
            Solicitar adelanto
          </Link>
        </div>

        {/* Tablet layout mejor alineado */}
        <div className="hidden md:flex lg:hidden justify-between items-center w-full mt-2 px-2">
          {/* Menú hamburguesa */}
          <button
            className="flex flex-col space-y-1 cursor-pointer"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="w-7 h-[3px] bg-black rounded"></span>
            <span className="w-7 h-[3px] bg-black rounded"></span>
            <span className="w-7 h-[3px] bg-black rounded"></span>
          </button>

          {/* Botón verde con separación */}
          <Link
            href="/solicita-adelanto"
            className="bg-[#97D22A] text-white px-7 py-2 rounded-md font-semibold shadow-md hover:opacity-90 text-[18px] transition ml-4"
          >
            Solicitar adelanto
          </Link>
        </div>

        {/* Menú desplegable (móvil y tablet) */}
        {menuAbierto && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:py-8 lg:hidden animate-fadeIn z-50">
            {menuItems.map((item) => (
              <Link
                key={item.nombre}
                href={item.ruta}
                className="text-[18px] sm:text-[20px] text-black hover:text-[#017EFF] font-medium"
                onClick={() => setMenuAbierto(false)}
              >
                {item.nombre}
              </Link>
            ))}

            <Link
              href="/solicita-adelanto"
              className="mt-2 bg-[#97D22A] text-white px-6 py-2 rounded-md font-semibold shadow-md hover:opacity-90 text-[18px] transition"
              onClick={() => setMenuAbierto(false)}
            >
              Solicitar adelanto
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
