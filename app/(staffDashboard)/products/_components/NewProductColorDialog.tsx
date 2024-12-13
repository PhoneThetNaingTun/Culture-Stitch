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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { assetProductUpload } from "@/store/Slices/DashBoardAppSlice";
import { CreateProductColor } from "@/store/Slices/ProductColorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { NewProductColorPayload } from "@/types/productColor";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw, X } from "lucide-react";
import { useState } from "react";

export const NewProductColorDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { colors } = useAppSelector((state) => state.Color);
  const { products } = useAppSelector((state) => state.Product);
  const { productColorLoading } = useAppSelector((state) => state.ProductColor);
  const { imageUploadLoading } = useAppSelector((state) => state.DashBoardApp);

  const [newProductColor, setNewProductColor] =
    useState<NewProductColorPayload>({
      productId: "",
      colorId: "",
      image: "",
    });
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useAppDispatch();
  const handleCreateProductColor = () => {
    if (!newProductColor.productId || !newProductColor.colorId) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }
    if (imageFile) {
      dispatch(
        assetProductUpload({
          file: imageFile,
          onSuccess: (image) => {
            newProductColor.image = image;
            dispatch(
              CreateProductColor({
                ...newProductColor,
                onSuccess: (message) => {
                  toast({ title: message, variant: "default" });
                  setNewProductColor({ productId: "", colorId: "", image: "" });
                  setImageFile(undefined);
                  setOpen(false);
                },
                onError: (error) => {
                  toast({ title: error, variant: "destructive" });
                },
              })
            );
          },
          onError: (error) => {
            toast({ title: error, variant: "destructive" });
          },
        })
      );
    } else {
      return toast({
        title: "Please enter image file!",
        variant: "destructive",
      });
    }
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
        <DialogDescription>
          Adding this will add color to your product
        </DialogDescription>

        <div>
          <Label>Product Name</Label>
          <Select
            onValueChange={(e) => {
              setNewProductColor({
                ...newProductColor,
                productId: e,
              });
            }}
            disabled={productColorLoading || imageUploadLoading}
          >
            <SelectTrigger className="mb-3">
              <SelectValue placeholder="Choose Product " />
            </SelectTrigger>
            <SelectContent>
              {products && products.length > 0
                ? products.map((product) => (
                    <SelectItem value={product.id} key={product.id}>
                      {product.name}
                    </SelectItem>
                  ))
                : "Product Not Found"}
            </SelectContent>
          </Select>
          <Label>Color</Label>

          <Select
            onValueChange={(e) => {
              setNewProductColor({
                ...newProductColor,
                colorId: e,
              });
            }}
            disabled={productColorLoading || imageUploadLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Color" />
            </SelectTrigger>
            <SelectContent>
              {colors && colors.length > 0
                ? colors.map((color) => (
                    <SelectItem value={color.id} key={color.id}>
                      <div className="flex items-center gap-x-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-600"
                          style={{ backgroundColor: color.color }}
                        />
                        {color.color}
                      </div>
                    </SelectItem>
                  ))
                : "Color Not Found"}
            </SelectContent>
          </Select>
          <ImageUpload onDrop={(files) => setImageFile(files[0])} />
          {imageFile && (
            <Badge
              className="bg-gray-300 text-black flex items-center w-fit mt-2"
              onClick={() => setImageFile(undefined)}
            >
              {imageFile.name}
              <span className="ml-2">
                <X className="w-3 h-3" />
              </span>
            </Badge>
          )}
          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={productColorLoading || imageUploadLoading}
              onClick={handleCreateProductColor}
            >
              {productColorLoading || imageUploadLoading ? (
                <RefreshCcw className="w-3 h-3 animate-spin" />
              ) : (
                " Create New Product"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
