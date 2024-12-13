"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TypeColumn = {
  id: string;
  type: string;
};

export const typeColumn: ColumnDef<TypeColumn>[] = [
  { accessorKey: "type", header: "Types" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
