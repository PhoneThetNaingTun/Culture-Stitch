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
import { useToast } from "@/hooks/use-toast";
import { CreateCategoryType } from "@/store/Slices/CategoryTypeSlice";
import { CreateProductCategory } from "@/store/Slices/ProductCategorySlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewCategoryTypePayload } from "@/types/categoryTypes";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const NewProductCaotegoryTypeDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { categoryTypeLoading } = useAppSelector((state) => state.CategoryType);

  const [open, setOpen] = useState<boolean>(false);
  const [newCategoryType, setnewCategoryType] =
    useState<NewCategoryTypePayload>({ categroyTypeName: "" });

  const handleCrateProductCategoryType = () => {
    if (!newCategoryType.categroyTypeName) {
      return toast({
        title: "Please Fill Out All Fields!",
        variant: "destructive",
      });
    }
    dispatch(
      CreateCategoryType({
        ...newCategoryType,
        onSuccess: (message) => {
          toast({
            title: message,
            variant: "default",
          });
          setOpen(false);
          setnewCategoryType({ categroyTypeName: "" });
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
          Add New Product Category Type
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Product Category Type</DialogTitle>
        <DialogDescription>
          Adding this Product Category here will show at the navigation of home
          page!
        </DialogDescription>
        <div>
          <Label htmlFor="productCatgoryTypeInput">Category Type</Label>
          <Input
            id="productCatgoryTypeInput"
            placeholder="Put category name here"
            onChange={(e) => {
              setnewCategoryType({
                ...newCategoryType,
                categroyTypeName: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCrateProductCategoryType();
              }
            }}
            disabled={categoryTypeLoading}
          />
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={categoryTypeLoading}
              onClick={handleCrateProductCategoryType}
            >
              {categoryTypeLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                " Create New Product Type"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
