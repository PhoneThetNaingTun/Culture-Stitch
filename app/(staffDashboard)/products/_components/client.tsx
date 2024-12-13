"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { productColumn } from "./column";
import { NewProductDialog } from "./NewProductDialog";
import { useAppSelector } from "@/store/hooks";
import { NewProductColorDialog } from "./NewProductColorDialog";
import { productColorColumn } from "./product-color-column";
import { productSizeColorColumn } from "./porduct-size-column";
import { NewProductSizeColorDialog } from "./NewProductSizeColorDialog";

export default function ProductPageClient() {
  const { products } = useAppSelector((state) => state.Product);
  const { types } = useAppSelector((state) => state.ProductType);
  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { colors } = useAppSelector((state) => state.Color);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { sizes } = useAppSelector((state) => state.Size);

  const productData = products.map((item) => {
    const name = item.name;
    const type = types.find((type) => type.id === item.typeId)?.type;
    const productCategory = productCategories.find(
      (productCategory) => productCategory.id === item.productCategoryId
    )?.categoryName;
    const id = item.id;
    const price = item.price;
    const isFeatured = item.isFeatured;
    return { id, name, type, productCategory, price, isFeatured };
  });

  const productColorData = productColors.map((item) => {
    const name = products.find(
      (product) => product.id === item.productId
    )?.name;
    const colorCode = colors.find((color) => color.id === item.colorId)?.color;
    const id = item.id;
    return { id, name, colorCode };
  });

  const productSizeColorData = productSizeColors.map((item) => {
    const id = item.id;
    const productColor = productColors.find(
      (productColor) => productColor.id === item.productColorId
    );
    const name = products.find(
      (product) => product.id === productColor?.productId
    )?.name;
    const color = colors.find(
      (color) => color.id === productColor?.colorId
    )?.color;
    const size = sizes.find((size) => size.id === item.sizeId)?.size;
    const quantity = item.quantity;
    return { id, name, color, size, quantity };
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
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <Tabs defaultValue="product">
          <TabsList>
            <TabsTrigger value="product">Products</TabsTrigger>
            <TabsTrigger value="productColor">Product Colors</TabsTrigger>
            <TabsTrigger value="productSizes">Product Sizes</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <p className="font-roboto font-semibold text-2xl">Products</p>
            <div className="flex justify-end my-3">
              <NewProductDialog />
            </div>
            <div>
              <DataTable
                //@ts-ignore
                columns={productColumn}
                data={productData}
                filterKey="name"
              />
            </div>{" "}
          </TabsContent>
          <TabsContent value="productColor">
            <p className="font-roboto font-semibold text-2xl">Product Colors</p>
            <div className="flex justify-end my-3">
              <NewProductColorDialog />
            </div>

            <div>
              <DataTable
                //@ts-ignore
                columns={productColorColumn}
                data={productColorData}
                filterKey="name"
              />
            </div>
          </TabsContent>
          <TabsContent value="productSizes">
            <p className="font-roboto font-semibold text-2xl">Product Sizes</p>
            <div className="flex justify-end my-3">
              <NewProductSizeColorDialog />
            </div>
            <div>
              <DataTable
                //@ts-ignore
                columns={productSizeColorColumn}
                data={productSizeColorData}
                filterKey="name"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
