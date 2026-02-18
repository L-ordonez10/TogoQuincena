"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Inbox } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { THEME } from "@/lib/constants/theme";

const menuItems = [
  {
    label: "Solicitudes",
    icon: Inbox,
    href: "/dashboard",
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
                    backgroundColor: THEME.colors.green,
                    color: THEME.colors.white,
                  }
                  : {
                    color: THEME.colors.black,
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
