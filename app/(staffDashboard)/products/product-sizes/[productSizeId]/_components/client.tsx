"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DeleteButtonDialog from "@/components/ui/delete-button-dialog";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateProductSizeColorPayload } from "@/types/productSizeColor";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteProductSizeColor,
  UpdateProductSizeColor,
} from "@/store/Slices/ProductSizeColorSlice";
export default function ProductSizeColorDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { productSizeId } = param;

  const { productSizeColors, productSizeColorLoading } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { products } = useAppSelector((state) => state.Product);
  const { colors } = useAppSelector((state) => state.Color);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { sizes } = useAppSelector((state) => state.Size);

  const productsColorsData = productColors.map((item) => {
    const id = item.id;
    const colorName = colors.find((color) => color.id === item.colorId)?.color;
    const productName = products.find(
      (product) => product.id === item.productId
    )?.name;
    return { id, colorName, productName };
  });

  const [updatedProductSizeColor, setUpdatedProductSizeColor] =
    useState<UpdateProductSizeColorPayload>({
      id: productSizeId as string,
      productColorId: "",
      sizeId: "",
      quantity: 0,
    });

  const productSizeColor = productSizeColors.find(
    (item) => item.id === productSizeId
  );

  useEffect(() => {
    if (productSizeColor) {
      setUpdatedProductSizeColor(productSizeColor);
    }
  }, [productSizeColor]);

  const handleUpdateProductSizeColor = () => {
    if (
      !updatedProductSizeColor.productColorId ||
      !updatedProductSizeColor.sizeId ||
      updatedProductSizeColor.quantity < 0
    ) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }
    dispatch(
      UpdateProductSizeColor({
        ...updatedProductSizeColor,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/products");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  const handleDeleteProductSizeColor = () => {
    dispatch(
      DeleteProductSizeColor({
        id: productSizeId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/products");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Size Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">
            Product Size Details
          </p>
          <DeleteButtonDialog
            onDelete={handleDeleteProductSizeColor}
            loading={productSizeColorLoading}
            header="Product Size"
          />
        </div>
        <div className="lg:w-1/2">
          <Label>Product Name</Label>
          <Select
            onValueChange={(e) => {
              setUpdatedProductSizeColor({
                ...updatedProductSizeColor,
                productColorId: e,
              });
            }}
            disabled={productSizeColorLoading}
            value={updatedProductSizeColor.productColorId}
          >
            <SelectTrigger className="mb-3">
              <SelectValue placeholder="Choose Product " />
            </SelectTrigger>
            <SelectContent>
              {productsColorsData && productsColorsData.length > 0
                ? productsColorsData.map((product) => (
                    <SelectItem value={product.id} key={product.id}>
                      <div className="flex items-center gap-x-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-600"
                          style={{ backgroundColor: product.colorName }}
                        />
                        {product.productName}
                      </div>
                    </SelectItem>
                  ))
                : "Product Not Found"}
            </SelectContent>
          </Select>
          <Label>Sizes</Label>

          <Select
            onValueChange={(e) => {
              setUpdatedProductSizeColor({
                ...updatedProductSizeColor,
                sizeId: e,
              });
            }}
            disabled={productSizeColorLoading}
            value={updatedProductSizeColor.sizeId || ""}
          >
            <SelectTrigger className="mb-3">
              <SelectValue placeholder="Choose Size" />
            </SelectTrigger>
            <SelectContent>
              {sizes && sizes.length > 0
                ? sizes.map((size) => (
                    <SelectItem value={size.id} key={size.id}>
                      {size.size}
                    </SelectItem>
                  ))
                : "Size Not Found"}
            </SelectContent>
          </Select>

          <Label htmlFor="quantityInput">Quantity</Label>
          <Input
            id="quantityInput"
            placeholder="Quantities"
            type="number"
            min={0}
            onChange={(e) => {
              setUpdatedProductSizeColor({
                ...updatedProductSizeColor,
                quantity: Number(e.target.value),
              });
            }}
            value={updatedProductSizeColor.quantity}
          />

          <div className="mt-5 flex justify-end">
            <Button
              className="bg-green-500 hover:bg-green-700"
              disabled={productSizeColorLoading}
              onClick={handleUpdateProductSizeColor}
            >
              {productSizeColorLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                " Upadate"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
