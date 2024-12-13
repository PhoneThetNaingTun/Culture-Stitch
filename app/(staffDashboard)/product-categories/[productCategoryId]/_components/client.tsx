"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DeleteButtonDialog from "@/components/ui/delete-button-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteProductCategory,
  UpdatePrdocutCategory,
} from "@/store/Slices/ProductCategorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateProductCategoryPayload } from "@/types/productCategory";
import { RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductCategoryDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { productCategoryId } = param;
  const { toast } = useToast();
  const { productCategories, productCategoryLoading } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { categoryTypes } = useAppSelector((state) => state.CategoryType);

  const productCategory = productCategories.find(
    (item) => item.id === productCategoryId
  );

  const [updateProductCategory, setUpdateProductCategory] =
    useState<UpdateProductCategoryPayload>({
      id: productCategoryId as string,
      categoryName: "",
      categoryTypeId: "",
    });

  useEffect(() => {
    if (productCategory) {
      setUpdateProductCategory(productCategory);
    }
  }, [productCategory]);

  const handleUpdateProductCategory = () => {
    if (!updateProductCategory.categoryName || !updateProductCategory?.id) {
      return toast({ title: "Fill Out All Fields!", variant: "destructive" });
    }
    dispatch(
      UpdatePrdocutCategory({
        ...updateProductCategory,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/product-categories");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteProductCategory = () => {
    dispatch(
      DeleteProductCategory({
        id: productCategoryId as string,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/product-categories");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      {" "}
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
                <BreadcrumbLink href="/product-categories">
                  Product Categories
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Category Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">
            Edit Product Category Details
          </p>
          <DeleteButtonDialog
            onDelete={handleDeleteProductCategory}
            header="Product Category"
            loading={productCategoryLoading}
          />
        </div>
        <div className="mt-5 lg:w-1/2">
          <Label htmlFor="CategoryName">Category Name</Label>
          <Input
            id="CategoryName"
            placeholder="Put category name here"
            defaultValue={updateProductCategory.categoryName}
            disabled={productCategoryLoading}
            onChange={(e) => {
              setUpdateProductCategory({
                ...updateProductCategory,
                categoryName: e.target.value,
              });
            }}
          />
          <Label>Category Type</Label>
          <Select
            onValueChange={(e) => {
              setUpdateProductCategory({
                ...updateProductCategory,
                categoryTypeId: e,
              });
            }}
            disabled={productCategoryLoading}
            value={updateProductCategory.categoryTypeId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Product Type" />
            </SelectTrigger>
            <SelectContent>
              {categoryTypes && categoryTypes.length > 0
                ? categoryTypes.map((item) => (
                    <SelectItem value={item.id} key={item.id}>
                      {item.categroyTypeName}
                    </SelectItem>
                  ))
                : "Category Type Not Found"}
            </SelectContent>
          </Select>
          <div className="flex justify-end mt-5">
            <Button
              className="bg-green-500 hover:bg-green-700"
              disabled={productCategoryLoading}
              onClick={handleUpdateProductCategory}
            >
              {productCategoryLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
