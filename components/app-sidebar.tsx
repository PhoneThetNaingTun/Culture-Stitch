"use client";

import * as React from "react";
import {
  Boxes,
  Command,
  PackageSearch,
  Palette,
  Ruler,
  Shirt,
  SquareTerminal,
} from "lucide-react";

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
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.DashBoardApp);
  const data = {
    navMain: [
      {
        title: "Board",
        url: "/boards",
        icon: SquareTerminal,
        isActive: pathname.includes("/boards"),
      },
      {
        title: "Product Categories",
        url: "/product-categories",
        icon: Boxes,
        isActive: pathname.includes("/product-categories"),
      },
      {
        title: "Products",
        url: "/products",
        icon: Shirt,
        isActive: pathname.includes("/products"),
      },
      {
        title: "Product Types",
        url: "/product-types",
        icon: PackageSearch,
        isActive: pathname.includes("/product-types"),
      },
      {
        title: "Product Colors",
        url: "/colors",
        icon: Palette,
        isActive: pathname.includes("/colors"),
      },
      {
        title: "Product Sizes",
        url: "/sizes",
        icon: Ruler,
        isActive: pathname.includes("/sizes"),
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/over-view">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DashBoard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
