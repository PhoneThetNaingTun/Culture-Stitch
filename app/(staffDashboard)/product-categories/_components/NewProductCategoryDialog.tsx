"use client";

import { ImageUpload } from "@/components/imageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreateProductCategory } from "@/store/Slices/ProductCategorySlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewProductCategoryPayload } from "@/types/productCategory";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const NewProductCaotegoryDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { productCategoryLoading } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { categoryTypes } = useAppSelector((state) => state.CategoryType);

  const [open, setOpen] = useState<boolean>(false);
  const [newProductCategory, setNewProductCategory] =
    useState<NewProductCategoryPayload>({
      categoryName: "",
      categoryTypeId: "",
    });

  const handleCreateProductCategory = () => {
    if (
      !newProductCategory.categoryName ||
      !newProductCategory.categoryTypeId
    ) {
      return toast({
        title: "Please Fill Out All Fields!",
        variant: "destructive",
      });
    }
    dispatch(
      CreateProductCategory({
        ...newProductCategory,
        onSuccess: (message) => {
          toast({
            title: message,
            variant: "default",
          });
          setOpen(false);
          setNewProductCategory({ categoryName: "", categoryTypeId: "" });
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New Product Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Product Category</DialogTitle>
        <DialogDescription>
          Adding this Product Category here will show at the navigation of home
          page!
        </DialogDescription>
        <div>
          <Label htmlFor="productCatgoryInput">Category Name</Label>
          <Input
            id="productCatgoryInput"
            placeholder="Put category name here"
            onChange={(e) => {
              setNewProductCategory({
                ...newProductCategory,
                categoryName: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateProductCategory();
              }
            }}
            disabled={productCategoryLoading}
          />
          <Label>Category Type</Label>
          <Select
            onValueChange={(e) => {
              setNewProductCategory({
                ...newProductCategory,
                categoryTypeId: e,
              });
            }}
            disabled={productCategoryLoading}
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
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={productCategoryLoading}
              onClick={handleCreateProductCategory}
            >
              {productCategoryLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                " Create New Product Category"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
