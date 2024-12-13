"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./order-cell-action";
import { $Enums } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { OrderCancelCellAction } from "./order-cancel-cell-action";

export type OrderCancelColumn = {
  id: string;
  name: string;
  email: string;
  phone: string;
  quantity: number;
  status: $Enums.Status;
  createdDate: Date;
};

export const orderCancelColumn: ColumnDef<OrderCancelColumn>[] = [
  {
    accessorKey: "id",
    header: "Order Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => (
      <div>
        <p className="text-red-500">{row.original.status}</p>
      </div>
    ),
  },
  {
    accessorKey: "createdDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <p>{new Date(row.original.createdDate).toLocaleDateString("en-Us")}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <OrderCancelCellAction data={row.original} />,
    header: "Action",
  },
];
