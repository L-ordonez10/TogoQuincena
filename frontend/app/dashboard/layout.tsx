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
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import { DashboardNav } from "./components/DashboardNav";
import { HeaderTitle } from "./components/HeaderTitle";
import { DashboardGuard } from "./components/DashboardGuard";
import { THEME } from "../lib/constants";
import { LogoutButton } from "./components/LogoutButton";

const { colors } = THEME;


export const metadata: Metadata = {
  title: "Dashboard - QuincenaToGo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <SidebarProvider
        className="min-h-screen"
        style={{ backgroundColor: colors.grayBackground }}
      >
        <Sidebar
          collapsible="icon"
          variant="inset"
          className="border-r"
          style={{ borderColor: colors.gray, backgroundColor: colors.white }}
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
              <SidebarGroupLabel style={{ color: colors.black }}>
                Panel
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <DashboardNav />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter className="p-4">
            <LogoutButton />
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
    </DashboardGuard>
  );
}
