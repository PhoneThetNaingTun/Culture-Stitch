"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import OverViewCard from "./over-view-cards";
import { useAppSelector } from "@/store/hooks";

export default function OverViewPageClient() {
  const { orders } = useAppSelector((state) => state.Order);
  const { customers } = useAppSelector((state) => state.Customer);
  const { products } = useAppSelector((state) => state.Product);
  const { reviews } = useAppSelector((state) => state.Review);
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Over View</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <OverViewCard title="Orders" number={orders.length} />
        <OverViewCard title="Logged Users" number={customers.length} />
        <OverViewCard title="Total Products" number={products.length} />
        <OverViewCard title="Total Reviews" number={reviews.length} />
      </div>
    </div>
  );
}
