import Image from "next/image";
import { FaFacebookF, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#DEDEDE] text-black py-14">
      {/* Contenedor centrado con ancho máximo */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          {/* Columna 1: Logo y redes */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Image
                  src="/imagenes/LogoQuincenaTooGo_negro.svg"
                  alt="Logo"
                  width={180}
                  height={50}
                />
              </div>
              <p className="text-sm mt-1 font-bold">Así de fácil.</p>
            </div>

            {/* Redes sociales */}
            <div className="flex space-x-5 mt-3 text-[22px]">
              <a href="#" className="hover:opacity-80">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:opacity-80">
                <FaXTwitter />
              </a>
              <a href="#" className="hover:opacity-80">
                <FaInstagram />
              </a>
              <a href="#" className="hover:opacity-80">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Columna 2: Nosotros */}
          <div>
            <h3 className="font-semibold mb-3 md:text-[15px] lg:text-[18px]">Nosotros</h3>
            <ul className="space-y-2 md:text-[15px] lg:text-[18px]">
              <li><a href="#">Nuestros objetivos</a></li>
              <li><a href="#">Nuestra misión</a></li>
              <li><a href="#">Nuestra visión</a></li>
            </ul>
          </div>

          {/* Columna 3: Producto */}
          <div>
            <h3 className="font-semibold mb-3 md:text-[15px] lg:text-[18px]">Producto</h3>
            <ul className="space-y-2 md:text-[15px] text-[18px]">
              <li><a href="#">Requisitos</a></li>
              <li><a href="#">Monto</a></li>
              <li><a href="#">Formas de cancelar adelanto</a></li>
              <li><a href="#">Control y seguridad</a></li>
              <li><a href="#">Pasos</a></li>
            </ul>
          </div>

          {/* Columna 4: Cotizador / Contacto */}
          <div>
            <h3 className="font-semibold mb-3 md:text-[15px] lg:text-[18px]">Cotizador</h3>
            <ul className="space-y-2 md:text-[15px] text-[18px]">
              <li><a href="#">Cotizador</a></li>
            </ul>

            <h3 className="font-semibold mt-5 mb-3 md:text-[15px] lg:text-[18px]">Contacto</h3>
            <ul className="space-y-2 md:text-[15px] lg:text-[18px]">
              <li><a href="#">Formulario</a></li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-400 mt-10 pt-6 text-center text-sm leading-relaxed">
          <p className="md:text-[15px] lg:text-[18px]">
            © 2025 QuincenaToGo. Todos los derechos reservados. |{" "}
            <a href="#" className="hover:text-[#017EFF]">Política de Privacidad</a> |{" "}
            <a href="#" className="hover:text-[#017EFF]">Términos y Condiciones</a> |{" "}
            <a href="#" className="hover:text-[#017EFF]">Contáctanos</a>
          </p>
          <p className="mt-2  md:text-[15px] lg:text-[18px]">
            Página diseñada por <span className="font-semibold">BOLD.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
