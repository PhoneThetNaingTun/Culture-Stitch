"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderConfirmColumn = {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  orderId: string;
};

export const orderConfirmColumn: ColumnDef<OrderConfirmColumn>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
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
      <p>{new Date(row.original.createdAt).toLocaleDateString("en-Us")}</p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
