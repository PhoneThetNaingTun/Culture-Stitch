"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
  id: string;
  size: string;
};

export const sizeColumn: ColumnDef<SizeColumn>[] = [
  { accessorKey: "size", header: "Sizes" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
