"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { orderConfirmColumn } from "./order-confirm-column";
import LogoutDialog from "@/components/LogoutDialog";

export default function AdminProfilePageClient() {
  const { user } = useAppSelector((state) => state.DashBoardApp);
  const { orderConfirms } = useAppSelector((state) => state.OrderConfirm);
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/over-view">DashBoard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-28 w-28 rounded-lg">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback className="rounded-lg">
                {user.name}
              </AvatarFallback>
            </Avatar>
            <div className="font-roboto">
              <p className="text-3xl font-semibold">{user.name}</p>
              <p className="">{user.email}</p>
            </div>
          </div>
          <div>
            <LogoutDialog />
          </div>
        </div>
        <div className="mt-10">
          <p className="font-roboto text-xl font-semibold">
            Your Confirm Orders
          </p>
          <DataTable
            columns={orderConfirmColumn}
            data={orderConfirms}
            filterKey="orderId"
          />
        </div>
      </div>
    </div>
  );
}
