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
import { sizeColumn } from "./column";
import { useAppSelector } from "@/store/hooks";
import { NewSizeDialog } from "./NewSizeDialog";

export default function SizePageClient() {
  const { sizes } = useAppSelector((state) => state.Size);
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
                <BreadcrumbPage>Product Sizes</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <p className="font-roboto font-semibold text-2xl">Product Sizes</p>
        <div className="flex justify-end my-3">
          <NewSizeDialog />
        </div>
        <div>
          <DataTable columns={sizeColumn} data={sizes} filterKey="size" />
        </div>
      </div>
    </div>
  );
}
