"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { productCategoryColumn } from "./column";
import { NewProductCaotegoryDialog } from "./NewProductCategoryDialog";
import { useAppSelector } from "@/store/hooks";
import { NewProductCaotegoryTypeDialog } from "./NewProductCategoryTypeDialog";
import { productCategoryTypeColumn } from "./category-type-column";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductCategoryPageClient() {
  const { categoryTypes } = useAppSelector((state) => state.CategoryType);

  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );

  const produtCategoryData = productCategories.map((item) => {
    const id = item.id;
    const categoryName = item.categoryName;
    const categoryType = categoryTypes.find(
      (type) => type.id === item.categoryTypeId
    )?.categroyTypeName;
    return { id, categoryName, categoryType };
  });
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/over-view">DashBoard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <Tabs defaultValue="productCategoryTypes">
          <TabsList>
            <TabsTrigger value="productCategoryTypes">
              Product Category Types
            </TabsTrigger>
            <TabsTrigger value="productCategories">
              Product Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="productCategoryTypes">
            <p className="font-roboto font-semibold text-2xl">
              Product Category Types
            </p>
            <div className="flex justify-end my-3">
              <NewProductCaotegoryTypeDialog />
            </div>
            <DataTable
              columns={productCategoryTypeColumn}
              data={categoryTypes}
              filterKey="categroyTypeName"
            />
          </TabsContent>
          <TabsContent value="productCategories">
            <p className="font-roboto font-semibold text-2xl">
              Product Categories
            </p>
            <div className="flex justify-end my-3">
              <NewProductCaotegoryDialog />
            </div>
            <DataTable
              //@ts-ignore
              columns={productCategoryColumn}
              data={produtCategoryData}
              filterKey="categoryName"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
