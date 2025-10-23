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

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Manajemen Tenant",
      url: "/tenant",
      icon: IconDatabase,
    },
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
  ],
};

interface AppSidebarProps{
  ...props : React.ComponentProps<typeof Sidebar>
}

export function AppSidebar({
  
  user,
  ...props }: 
  React.ComponentProps<typeof Sidebar>,

) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">mymedica-queue</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
