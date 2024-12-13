"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string;
  color: string;
};

export const colorColumn: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "color",
    header: "Color Code",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-6 rounded-full border border-gray-600"
          style={{ backgroundColor: row.original.color }}
        />

        {row.original.color}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
