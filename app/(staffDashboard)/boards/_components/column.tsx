"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BoardColumn = {
  id: string;
  staffName: string;
  label: string;
};

export const boardColumn: ColumnDef<BoardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  { accessorKey: "staffName", header: "Creater/Updater Name" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
