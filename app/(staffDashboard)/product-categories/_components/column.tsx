"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductCategoryColumn = {
  id: string;
  categoryName: string;
  categoryType: string;
};

export const productCategoryColumn: ColumnDef<ProductCategoryColumn>[] = [
  { accessorKey: "categoryName", header: "Categories" },
  { accessorKey: "categoryType", header: "Category Types" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Action",
  },
];
