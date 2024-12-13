"use client";

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

import { CreateProductSizeColor } from "@/store/Slices/ProductSizeColorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NewProductSizeColorPayload } from "@/types/productSizeColor";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus, RefreshCcw, X } from "lucide-react";
import { useState } from "react";

export const NewProductSizeColorDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const { products } = useAppSelector((state) => state.Product);
  const { colors } = useAppSelector((state) => state.Color);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { sizes } = useAppSelector((state) => state.Size);
  const { productSizeColorLoading } = useAppSelector(
    (state) => state.ProductSizeColor
  );

  const productsColorsData = productColors.map((item) => {
    const id = item.id;
    const colorName = colors.find((color) => color.id === item.colorId)?.color;
    const productName = products.find(
      (product) => product.id === item.productId
    )?.name;
    return { id, colorName, productName };
  });

  const [newProductSizeColor, setNewProductSizeColor] =
    useState<NewProductSizeColorPayload>({
      productColorId: "",
      sizeId: "",
      quantity: 0,
    });
  const dispatch = useAppDispatch();

  const handleCreateProductSizeColor = () => {
    if (
      !newProductSizeColor.productColorId ||
      !newProductSizeColor.sizeId ||
      newProductSizeColor.quantity < 0
    ) {
      return toast({
        title: "Please fill out all fields!",
        variant: "destructive",
      });
    }

    dispatch(
      CreateProductSizeColor({
        ...newProductSizeColor,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewProductSizeColor({
            productColorId: "",
            sizeId: "",
            quantity: 0,
          });
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
        <DialogDescription>
          Adding this will add size and quantity to your product
        </DialogDescription>

        <div>
          <Label>Product Name</Label>
          <Select
            onValueChange={(e) => {
              setNewProductSizeColor({
                ...newProductSizeColor,
                productColorId: e,
              });
            }}
            disabled={productSizeColorLoading}
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
              setNewProductSizeColor({
                ...newProductSizeColor,
                sizeId: e,
              });
            }}
            disabled={productSizeColorLoading}
          >
            <SelectTrigger>
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
              setNewProductSizeColor({
                ...newProductSizeColor,
                quantity: Number(e.target.value),
              });
            }}
          />

          <div className="mt-5 w-full">
            <Button
              className="w-full"
              disabled={productSizeColorLoading}
              onClick={handleCreateProductSizeColor}
            >
              {productSizeColorLoading ? (
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
