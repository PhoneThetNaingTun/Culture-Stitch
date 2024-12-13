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
import { CreateType } from "@/store/Slices/TypeSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewProductCategoryPayload } from "@/types/productCategory";
import { NewTypePayload } from "@/types/type";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const NewTypeDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { typeLoading } = useAppSelector((state) => state.ProductType);

  const [open, setOpen] = useState<boolean>(false);
  const [newType, setNewType] = useState<NewTypePayload>({
    type: "",
  });

  const handleCreateType = () => {
    if (!newType.type) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }
    dispatch(
      CreateType({
        ...newType,
        onSuccess: (message) => {
          toast({
            title: message,
            variant: "default",
          });
          setOpen(false);
          setNewType({ type: "" });
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
          Add New Product Type
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Product Type</DialogTitle>
        <DialogDescription>Adding Product Type</DialogDescription>
        <div>
          <Label htmlFor="productTypeInput"> Product Type Name</Label>
          <Input
            id="productTypeInput"
            placeholder="Put product type name here"
            onChange={(e) => {
              setNewType({
                ...newType,
                type: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateType();
              }
            }}
            disabled={typeLoading}
          />
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={typeLoading}
              onClick={handleCreateType}
            >
              {typeLoading ? (
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
