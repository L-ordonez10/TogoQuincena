"use client";

import { usePathname, useParams } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

export function HeaderTitle() {
  const pathname = usePathname();
  const params = useParams();
  const slug = (params as any)?.slug as string | undefined;

  let section = "Panel";
  let title = "Solicitudes";

  if (pathname === "/dashboard/usuarios") {
    section = "Gestión";
    title = "Usuarios";
  } else if (slug) {
    section = "Detalle";
    title = "Solicitud";
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#017eff]">{section}</p>
        <h1 className="text-2xl font-semibold text-black">{title}</h1>
      </div>
    </div>
  );
}
