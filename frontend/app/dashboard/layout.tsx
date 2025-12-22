import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import { DashboardNav } from "./components/DashboardNav";
import { HeaderTitle } from "./components/HeaderTitle";
const palette = {
  black: "#000000",
  green: "#97d22a",
  blue: "#017eff",
  gray: "#dedede",
  white: "#ffffff",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      className="min-h-screen"
      style={{ backgroundColor: "rgba(222, 222, 222, 0.14)" }}
    >
      <Sidebar
        collapsible="icon"
        variant="inset"
        className="border-r"
        style={{ borderColor: palette.gray, backgroundColor: palette.white }}
      >
        <SidebarHeader className="gap-3 p-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/imagenes/LogoQuincenaToGo.svg"
                alt="Logo"
                width={160}
                height={80}
                className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
                priority
              />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel style={{ color: palette.black }}>
              Panel
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <DashboardNav />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-4">
          <div
            className="rounded-xl p-4 shadow-sm"
            style={{ backgroundColor: "rgba(1, 126, 255, 0.08)" }}
          >
            <p className="text-sm font-semibold" style={{ color: palette.black }}>
              Nuevo adelanto
            </p>
            <p className="text-xs" style={{ color: palette.black }}>
              Crea una solicitud rápida.
            </p>
            <Button
              size="sm"
              className="mt-3 w-full"
              style={{
                backgroundColor: palette.green,
                color: palette.black,
              }}
              asChild
            >
              <Link href="/solicita-adelanto">Iniciar flujo</Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <HeaderTitle />
            </div>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
