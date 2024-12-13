"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductSizeColorCellAction } from "./product-size-color-cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductSizeColorColumn = {
  id: string;
  name: string;
  size: string;
  quantity: number;
  color: string;
};

export const productSizeColorColumn: ColumnDef<ProductSizeColorColumn>[] = [
  { accessorKey: "name", header: "Product Names" },
  {
    accessorKey: "size",
    header: "Sizes",
  },
  {
    accessorKey: "color",
    header: "Color",
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
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.quantity === 0 ? (
          <span className="text-red-500">Out of stock!</span>
        ) : (
          row.original.quantity
        )}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <ProductSizeColorCellAction data={row.original} />,
    header: "Action",
  },
];
