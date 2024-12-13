"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductColorCellAction } from "./product-color-cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColorColumn = {
  id: string;
  name: string;
  colorCode: string;
};

export const productColorColumn: ColumnDef<ProductColorColumn>[] = [
  { accessorKey: "name", header: "Product Name" },
  {
    accessorKey: "colorCode",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div
          className="w-6 h-6 rounded-full border border-gray-600"
          style={{ backgroundColor: row.original.colorCode }}
        />

        {row.original.colorCode}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <ProductColorCellAction data={row.original} />,
    header: "Action",
  },
];
