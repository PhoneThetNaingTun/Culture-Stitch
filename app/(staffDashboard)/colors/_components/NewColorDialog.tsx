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
import { CreateColor } from "@/store/Slices/ColorSlice";
import { CreateProductCategory } from "@/store/Slices/ProductCategorySlice";
import { CreateType } from "@/store/Slices/TypeSlice";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewColorPayload } from "@/types/color";
import { NewProductCategoryPayload } from "@/types/productCategory";
import { NewTypePayload } from "@/types/type";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export const NewColorDialog = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { colorLoading } = useAppSelector((state) => state.Color);

  const [open, setOpen] = useState<boolean>(false);
  const [newColor, setNewColor] = useState<NewColorPayload>({
    color: "",
  });

  const handleCreateColor = () => {
    if (!newColor.color) {
      return toast({
        title: "Please Enter All Fields!",
        variant: "destructive",
      });
    }
    dispatch(
      CreateColor({
        ...newColor,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewColor({ color: "" });
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
          Add New Product Color
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Product Color</DialogTitle>
        <DialogDescription className="text-red-500">
          Please add only color code with #( hashtag )!
        </DialogDescription>
        <div>
          <Label htmlFor="productColorInput"> Product Color Code</Label>
          <Input
            id="productColorInput"
            placeholder="Put Product Color Code (eg.#ffff)..."
            onChange={(e) => {
              setNewColor({
                ...newColor,
                color: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCreateColor();
              }
            }}
            disabled={colorLoading}
          />
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={colorLoading}
              onClick={handleCreateColor}
            >
              {colorLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                " Create New Product Color"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
