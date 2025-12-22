"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Inbox } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const palette = {
  black: "#000000",
  green: "#97d22a",
  white: "#ffffff",
};

const menuItems = [
  {
    label: "Solicitudes",
    icon: Inbox,
    href: "/dashboard",
  },
  {
    label: "Archivos",
    icon: Inbox,
    href: "/dashboard/archivos",
  }
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="font-medium"
              style={
                isActive
                  ? {
                    backgroundColor: palette.green,
                    color: palette.white,
                  }
                  : {
                    color: palette.black,
                  }
              }
            >
              <Link href={item.href} className="flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
