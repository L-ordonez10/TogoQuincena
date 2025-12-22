"use client";

import { usePathname, useParams } from "next/navigation";
import { decryptId } from "@/lib/encryption";

export function HeaderTitle() {
  const pathname = usePathname();
  const params = useParams();
  const slug = (params as any)?.slug as string | undefined;

  // Rutas estáticas simples
  if (pathname === "/dashboard/usuarios") {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#017eff]">Gestión</p>
        <h1 className="text-2xl font-semibold text-black">Usuarios</h1>
      </div>
    );
  }

  // Ruta de detalle con slug detectado: mostrar sección Detalle y título dinámico
  if (slug) {
    const id = decryptId(slug);
    const title =  "Solicitud";
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#017eff]">Detalle</p>
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
      </div>
    );
  }

  // Valor por defecto: listado de solicitudes
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#017eff]">Panel</p>
      <h1 className="text-2xl font-semibold text-black">Solicitudes</h1>
    </div>
  );
}
