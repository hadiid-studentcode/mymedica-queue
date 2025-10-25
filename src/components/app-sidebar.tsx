"use client";

import * as React from "react";
import {
  IconDatabase,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string;
    email: string;
  };
  isTenant: boolean;
}

export function AppSidebar({
  user,
  isTenant,
  ...sidebarProps
}: AppSidebarProps) {
  const navForTenant = [
    {
      title: "Manajemen Tahapan Antrian",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Manajemen Antrian",
      url: "#",
      icon: IconReport,
    },
  ];

  const navForAdmin = [
    {
      title: "Manajemen Tenant",
      url: "/tenant",
      icon: IconDatabase,
    },
  ];

  const sidebarNav = isTenant ? navForTenant : navForAdmin;

  return (
    <Sidebar collapsible="offcanvas" {...sidebarProps}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
