"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // 🔹 Menú dinámico
  const menuItems = [
    { nombre: "Nosotros", ruta: "/nosotros" },
    { nombre: "Descubre cómo", ruta: "/descubre-como" },
    { nombre: "Cotizador", ruta: "/cotizador" },
  ];

  return (
    <header className="relative w-full z-50">
      {/* ⚪ Barra principal */}
      <div className="bg-white flex flex-col md:grid md:grid-cols-[1fr_auto_auto] lg:grid-cols-[1fr_2fr_1fr] items-center md:gap-x-10 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 shadow-md relative">
        {/* Logo */}
        <div className="flex justify-between md:justify-start items-center w-full">
          <Link href="/" aria-label="QuincenaToGo - Ir al inicio">
            <Image
              src="/imagenes/LogoQuincenaToGo.svg"
              alt="QuincenaToGo - Adelantos de quincena"
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
            aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={menuAbierto}
            aria-controls="mobile-menu"
          >
            <span className="w-6 h-[3px] bg-black rounded"></span>
            <span className="w-6 h-[3px] bg-black rounded"></span>
            <span className="w-6 h-[3px] bg-black rounded"></span>
          </button>
        </div>

        {/* Menú centrado (escritorio) */}
        <nav className="hidden lg:flex justify-center space-x-16 xl:space-x-24 text-[18px] xl:text-[22px] text-black font-medium" aria-label="Navegación principal">
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
            aria-label="Solicitar adelanto de quincena"
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
            aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={menuAbierto}
            aria-controls="mobile-menu"
          >
            <span className="w-7 h-[3px] bg-black rounded"></span>
            <span className="w-7 h-[3px] bg-black rounded"></span>
            <span className="w-7 h-[3px] bg-black rounded"></span>
          </button>

          {/* Botón verde con separación */}
          <Link
            href="/solicita-adelanto"
            className="bg-[#97D22A] text-white px-7 py-2 rounded-md font-semibold shadow-md hover:opacity-90 text-[18px] transition ml-4"
            aria-label="Solicitar adelanto de quincena"
          >
            Solicitar adelanto
          </Link>
        </div>

        {/* Menú desplegable (móvil y tablet) */}
        {menuAbierto && (
          <nav id="mobile-menu" className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:py-8 lg:hidden animate-fadeIn z-50" aria-label="Menú de navegación móvil">
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
              aria-label="Solicitar adelanto de quincena"
            >
              Solicitar adelanto
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
