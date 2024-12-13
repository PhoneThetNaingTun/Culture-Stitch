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
import { CreateProductCategory } from "@/store/Slices/ProductCategorySlice";
import { CreateSize } from "@/store/Slices/SizeSlice";
import { CreateType } from "@/store/Slices/TypeSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewProductCategoryPayload } from "@/types/productCategory";
import { NewSizePayload } from "@/types/size";
import { NewTypePayload } from "@/types/type";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const NewSizeDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { sizeLoading } = useAppSelector((state) => state.Size);

  const [open, setOpen] = useState<boolean>(false);
  const [newSize, setNewSize] = useState<NewSizePayload>({
    size: "",
  });

  const handleCreateSize = () => {
    if (!newSize.size) {
      return toast({
        title: "Please Fill Out All Fields!",
        variant: "destructive",
      });
    }
    dispatch(
      CreateSize({
        ...newSize,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewSize({ size: "" });
          setOpen(false);
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
          Add New Product Size
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Product Size</DialogTitle>
        <DialogDescription>Adding Product Size</DialogDescription>
        <div>
          <Label htmlFor="productSizeInput"> Product Size Name</Label>
          <Input
            id="productSizeInput"
            placeholder="Put product Size name here"
            onChange={(e) => {
              setNewSize({
                ...newSize,
                size: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateSize();
              }
            }}
            disabled={sizeLoading}
          />
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={sizeLoading}
              onClick={handleCreateSize}
            >
              {sizeLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                " Create New Product Size"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
