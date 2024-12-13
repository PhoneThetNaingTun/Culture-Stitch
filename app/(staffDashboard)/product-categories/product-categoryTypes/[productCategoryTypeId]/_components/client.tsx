"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import DeleteButtonDialog from "@/components/ui/delete-button-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteCategoryType,
  UpdateCategoryType,
} from "@/store/Slices/CategoryTypeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateCategoryTypePayload } from "@/types/categoryTypes";
import { RefreshCcw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function CategoryTypeDetailPageClient() {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { productCategoryTypeId } = param;
  const { toast } = useToast();

  const { categoryTypes, categoryTypeLoading } = useAppSelector(
    (state) => state.CategoryType
  );

  const [updateCategoryType, setUpdateCategotyType] =
    useState<UpdateCategoryTypePayload>({
      id: productCategoryTypeId as string,
      categroyTypeName: "",
    });
  const categoryType = categoryTypes.find(
    (item) => item.id === productCategoryTypeId
  );
  useEffect(() => {
    if (categoryType) {
      setUpdateCategotyType(categoryType);
    }
  }, [categoryType]);

  const handleUpdateProductCategoryType = () => {
    if (!updateCategoryType.categroyTypeName || !updateCategoryType?.id) {
      return toast({ title: "Fill Out All Fields!", variant: "destructive" });
    }
    dispatch(
      UpdateCategoryType({
        ...updateCategoryType,
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
  const handleDeleteProductCategoryType = () => {
    dispatch(
      DeleteCategoryType({
        id: productCategoryTypeId as string,
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
                  Product Category Types
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Product Category Type Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="px-4">
        <div className="flex items-center justify-between">
          <p className="font-roboto font-semibold text-2xl">
            Edit Product Category Type Details
          </p>
          <DeleteButtonDialog
            onDelete={handleDeleteProductCategoryType}
            header="Product Category Type"
            loading={categoryTypeLoading}
          />
        </div>
        <div className="mt-10 lg:w-1/2">
          <Label htmlFor="CategoryType">Category Type</Label>
          <Input
            id="CategoryType"
            placeholder="Put category type here"
            defaultValue={updateCategoryType.categroyTypeName}
            disabled={categoryTypeLoading}
            onChange={(e) => {
              setUpdateCategotyType({
                ...updateCategoryType,
                categroyTypeName: e.target.value,
              });
            }}
          />
          <div className="flex justify-end mt-5">
            <Button
              className="bg-green-500 hover:bg-green-700"
              disabled={categoryTypeLoading}
              onClick={handleUpdateProductCategoryType}
            >
              {categoryTypeLoading ? (
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
