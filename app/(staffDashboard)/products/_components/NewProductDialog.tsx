"use client";

import { ImageUpload } from "@/components/imageUpload";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { CreateBoard } from "@/store/Slices/BoardSlice";
import {
  assetProductUpload,
  assetUpload,
} from "@/store/Slices/DashBoardAppSlice";
import { CreateProduct } from "@/store/Slices/ProductSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewBoardPayload } from "@/types/board";
import { NewProductPyaload } from "@/types/product";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Cross, CrossIcon, Plus, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";

export const NewProductDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { productCategories } = useAppSelector(
    (state) => state.ProductCategory
  );
  const { types } = useAppSelector((state) => state.ProductType);
  const { productLoading } = useAppSelector((state) => state.Product);
  const { imageUploadLoading } = useAppSelector((state) => state.DashBoardApp);

  const [newProduct, setNewProduct] = useState<NewProductPyaload>({
    name: "",
    productCategoryId: "",
    image: "",
    price: 0,
    typeId: "",
    isFeatured: false,
  });
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useAppDispatch();
  const handleCreateProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.productCategoryId ||
      !newProduct.price ||
      !newProduct.typeId
    ) {
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
            newProduct.image = image;
            dispatch(
              CreateProduct({
                ...newProduct,
                onSuccess: (message) => {
                  toast({ title: message, variant: "default" });
                  setNewProduct({
                    name: "",
                    productCategoryId: "",
                    image: "",
                    price: 0,
                    typeId: "",
                    isFeatured: false,
                  });
                  setImageFile(undefined);
                  setOpen(false);
                },
                onError: (error) => {
                  toast({ title: error, variant: "default" });
                },
              })
            );
          },
        })
      );
    } else {
      return toast({ title: "Image file required", variant: "destructive" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          Adding this product here will show at the home page
        </DialogDescription>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="productNameInput">Product Name</Label>
            <Input
              id="productNameInput"
              placeholder="Put product name here"
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateProduct();
                }
              }}
              disabled={productLoading || imageUploadLoading}
            />
          </div>
          <div>
            <Label htmlFor="priceInput">Price</Label>
            <Input
              id="priceInput"
              placeholder="Price"
              type="number"
              onChange={(e) => {
                setNewProduct({
                  ...newProduct,
                  price: Number(e.target.value),
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateProduct();
                }
              }}
              disabled={productLoading || imageUploadLoading}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Checkbox
              id="featureCheckBox"
              onCheckedChange={(e: boolean) => {
                setNewProduct({ ...newProduct, isFeatured: e });
              }}
              disabled={productLoading || imageUploadLoading}
            />
            <Label htmlFor="featureCheckBox">
              Feature <br />
              <span className="text-sm text-gray-600">
                Feature this will show in the home page of feature category
              </span>
            </Label>
          </div>

          <Label>Product Category</Label>
          <Select
            onValueChange={(e) => {
              setNewProduct({
                ...newProduct,
                productCategoryId: e,
              });
            }}
            disabled={productLoading || imageUploadLoading}
          >
            <SelectTrigger className="mb-3">
              <SelectValue placeholder="Choose Product Category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories && productCategories.length > 0
                ? productCategories.map((productCategory) => (
                    <SelectItem
                      value={productCategory.id}
                      key={productCategory.id}
                    >
                      {productCategory.categoryName}
                    </SelectItem>
                  ))
                : "Product Categories Not Found"}
            </SelectContent>
          </Select>
          <Label>Product Type</Label>

          <Select
            onValueChange={(e) => {
              setNewProduct({
                ...newProduct,
                typeId: e,
              });
            }}
            disabled={productLoading || imageUploadLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose Product Type" />
            </SelectTrigger>
            <SelectContent>
              {types && types.length > 0
                ? types.map((type) => (
                    <SelectItem value={type.id} key={type.id}>
                      {type.type}
                    </SelectItem>
                  ))
                : "Product Type Not Found"}
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
              disabled={productLoading || imageUploadLoading}
              onClick={handleCreateProduct}
            >
              {productLoading || imageUploadLoading ? (
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
