"use client";
import React from "react";
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
import { DataTable } from "@/components/ui/data-table";
import { boardColumn } from "./column";
import { NewBoardDialog } from "./NewBoardDialog";
import { useAppSelector } from "@/store/hooks";

export const BoardPageClient = () => {
  const { boards } = useAppSelector((state) => state.Boards);
  const { staffAndAdmins } = useAppSelector((state) => state.StaffAndAdmin);
  const boardData = boards.map((board) => {
    const staffName = staffAndAdmins.find(
      (staff) => staff.id === board.userId
    )?.name;
    const label = board.label;
    const id = board.id;
    return { id, staffName, label };
  });
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
                <BreadcrumbPage>Board</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <p className="font-roboto font-semibold text-2xl">Board</p>
        <div className="flex justify-end my-3">
          <NewBoardDialog />
        </div>
        <DataTable
          //@ts-ignore
          columns={boardColumn}
          data={boardData}
          filterKey="label"
        />
      </div>
    </div>
  );
};
