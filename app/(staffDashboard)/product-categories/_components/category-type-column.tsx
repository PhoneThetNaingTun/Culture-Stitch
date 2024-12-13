"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductCategoryTypeCellAction } from "./category-type-cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductCategoryTypeColumn = {
  id: string;
  categroyTypeName: string;
};

export const productCategoryTypeColumn: ColumnDef<ProductCategoryTypeColumn>[] =
  [
    { accessorKey: "categroyTypeName", header: "Categories Types" },
    {
      id: "actions",
      cell: ({ row }) => <ProductCategoryTypeCellAction data={row.original} />,
      header: "Action",
    },
  ];
