"use client";

import { ChevronRight, Truck, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();
  const { orders } = useAppSelector((state) => state.Order);
  const pendingOrders = orders.filter((item) => item.orderStatus === "Pending");
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem
          className={cn(
            "p-3 w-full",
            pathname.includes("/orders") && "bg-black text-white p-3 rounded-lg"
          )}
        >
          <Link href={"/orders"} className="flex justify-between items-center">
            <span className="flex gap-3 items-center">
              <Truck />
              order
            </span>
            <span
              className={cn(
                " rounded-full px-2 py-1 text-sm bg-red-500",
                pathname.includes("/orders")
                  ? "bg-white text-black "
                  : "bg-black text-white "
              )}
            >
              {pendingOrders.length}
            </span>
          </Link>
        </SidebarMenuItem>
        {items.map((item, index) => (
          <SidebarMenuItem
            key={index}
            className={
              item.isActive ? "bg-black text-white p-3 rounded-lg" : "p-3"
            }
          >
            <Link href={item.url} className="flex gap-3 items-center">
              {item.icon && <item.icon />}
              {item.title}
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
