"use client";
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
import { typeColumn } from "./column";
import { NewTypeDialog } from "./NewTypeDialog";
import { useAppSelector } from "@/store/hooks";

export default function ProductTypeClientPage() {
  const { types } = useAppSelector((state) => state.ProductType);
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
                <BreadcrumbPage>Product Types</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <p className="font-roboto font-semibold text-2xl">Product Types</p>
        <div className="flex justify-end my-3">
          <NewTypeDialog />
        </div>
        <div>
          <DataTable columns={typeColumn} data={types} filterKey="type" />
        </div>
      </div>
    </div>
  );
}
