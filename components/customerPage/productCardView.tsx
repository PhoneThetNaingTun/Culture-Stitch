"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Fullscreen,
  Loader,
  PaletteIcon,
  RefreshCcw,
  RulerIcon,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  ProductCategories,
  ProductColors,
  ProductSizeColors,
  Products,
} from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { SelectedColor } from "./productCard";
import { Separator } from "../ui/separator";
import { addOrderDetail } from "@/store/Slices/OrderDetailSlice";
import { AddItems, addItem } from "@/store/Slices/AddToCartSlice";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { Badge } from "../ui/badge";
import CryptoJS from "crypto-js";
import { cn } from "@/lib/utils";
interface Prop {
  product: Products;
  color: { id: string; color?: string; image: string; colorId?: string }[];
  productSizeColor: ProductSizeColors[];
  productCategory?: ProductCategories;
}

export interface SelectedSize {
  id: string;
  size?: string;
}

function ProductCardView({
  product,
  color,
  productSizeColor,
  productCategory,
}: Prop) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { items, addToCartLoading } = useAppSelector(
    (state) => state.AddToCart
  );
  const { sizes } = useAppSelector((state) => state.Size);
  const { types } = useAppSelector((state) => state.ProductType);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { user } = useAppSelector((state) => state.CustomerApp);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const sizeData = Array.from(
    new Map(
      productSizeColor.map((item) => {
        const sizeId = item.sizeId;
        const size = sizes.find((size) => size.id === item.sizeId)?.size;
        return [sizeId, { sizeId, size }];
      })
    ).values()
  );
  const productType = types.find((item) => item.id === product.typeId);
  const [selectedColor, setSelectedColor] = useState<SelectedColor>();
  const [selectedSize, setSelectedSize] = useState<SelectedSize>();
  const [quantity, setQuantity] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const productColor = productColors.find(
    (item) =>
      item.productId === product.id && item.colorId === selectedColor?.colorId
  );

  const quantityFind = productSizeColor.find(
    (item) =>
      item.productColorId === productColor?.id &&
      item.sizeId === selectedSize?.id
  );
  const productSC = productSizeColor.find(
    (item) =>
      item.productColorId === productColor?.id &&
      item.sizeId === selectedSize?.id
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <div
                  className="p-3 rounded-full bg-white cursor-pointer w-fit"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Fullscreen className="w-4 h-4  " />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                align="center"
                className="bg-white text-black "
              >
                <p>View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center sm:flex-row  gap-10  pt-10 max-w-full  md:max-w-2xl   lg:max-w-4xl ">
        <div className="relative size-32 sm:size-full">
          <Image
            src={
              selectedColor?.color && selectedColor.color
                ? `/products/${selectedColor.image}`
                : `/products/${product.image}`
            }
            alt={product.image}
            className="object-cover   rounded-lg"
            width={700}
            height={700}
            onLoadingComplete={() => setImageLoading(false)}
          />
          {imageLoading && (
            <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 flex justify-center items-center">
              <Loader className="w-12 h-12 text-white animate-spin" />
            </div>
          )}
        </div>
        <div className="w-full md:min-w-[50%]  font-roboto flex flex-col overflow-y-scroll p-4 lg:p-0 sm:overflow-auto sm:flex-row gap-10 h-[250px] sm:h-full">
          <div className="w-full">
            <DialogTitle className="font-semibold font-michroma md:text-xl lg:text-2xl">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-sm font-roboto lg:text-sm mt-2 mb-4">
              Category : {productCategory?.categoryName} <br />
              <span>Material Type : {productType?.type}</span>
            </DialogDescription>
            <div>
              <div>
                <p className="font-semibold text-sm mt-2 font-michroma flex items-center gap-2 my-3">
                  <PaletteIcon className="w-5 h-5" /> Color
                </p>
                <div className="flex gap-1 items-center w-full flex-wrap">
                  {color.map((item) => (
                    <div
                      className={cn(
                        "w-5 h-5 cursor-pointer rounded-full mr-1",
                        selectedColor?.color === item.color
                          ? "  border-[2px] border-black"
                          : " border border-gray-600"
                      )}
                      style={{ backgroundColor: item.color }}
                      onClick={() => {
                        if (item.id === selectedColor?.id) {
                          return;
                        }
                        setImageLoading(true);
                        setSelectedColor({
                          id: item.id,
                          color: item.color,
                          image: item.image,
                          colorId: item.colorId,
                        });
                        setQuantity(1);
                      }}
                      key={item.id}
                    />
                  ))}
                </div>
              </div>

              <Separator className="my-2" />
              <div>
                <p className="font-semibold text-sm font-michroma flex items-center gap-2 my-3">
                  <RulerIcon className="w-5 h-5" />
                  Sizes
                </p>
                <div className="flex items-center gap-2">
                  {sizeData.map((item) => (
                    <div
                      className={cn(
                        "cursor-pointer font-michroma",
                        selectedSize?.id === item.sizeId &&
                          "border-[2px] border-black "
                      )}
                      key={item.sizeId}
                      onClick={() => {
                        if (item.sizeId === selectedSize?.id) {
                          return;
                        }
                        setSelectedSize({ id: item.sizeId, size: item.size });
                        setQuantity(1);
                      }}
                    >
                      <p className="py-1 px-3">{item.size}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-2" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mt-1">
                  <span className="opacity-50 text-xs font-michroma">
                    Choosen Color :
                  </span>
                  {selectedColor ? (
                    <div
                      className="w-5 h-5 border rounded-full"
                      style={{ backgroundColor: selectedColor.color }}
                    />
                  ) : (
                    "-"
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-50 text-xs font-michroma">
                    Choosen Size :
                  </span>
                  {selectedSize ? (
                    <div className="">
                      <p className="py-1 px-3 font-michroma">
                        {selectedSize.size}
                      </p>
                    </div>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
              <div>
                {selectedColor && selectedSize ? (
                  <>
                    {quantityFind?.quantity !== 0 && quantityFind ? (
                      <Badge className="bg-green-500 rounded-full hover:bg-green-700">
                        Instock : {quantityFind.quantity}
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500 rounded-full hover:bg-red-700">
                        Out Of Stock
                      </Badge>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3 text-lg font-michroma">
                Price :
                <span className="font-semibold">{product.price} Kyats</span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-end gap-3 mt-5">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    disabled={
                      selectedColor &&
                      selectedSize &&
                      quantityFind?.quantity !== 0 &&
                      quantityFind
                        ? false
                        : true
                    }
                  >
                    -
                  </Button>
                  <Input
                    disabled={
                      selectedColor &&
                      selectedSize &&
                      quantityFind?.quantity !== 0 &&
                      quantityFind
                        ? false
                        : true
                    }
                    value={quantity}
                    type="number"
                    min={0}
                    max={quantityFind?.quantity}
                    readOnly
                    className="max-w-12 appearance-none focus-visible:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none shadow-none border-x-0 rounded-none border-t-0 border-b-2 border-black"
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                    }}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      if (quantityFind) {
                        if (quantity < quantityFind.quantity) {
                          setQuantity(quantity + 1);
                        }
                      }
                    }}
                    disabled={
                      selectedColor &&
                      selectedSize &&
                      quantityFind?.quantity !== 0 &&
                      quantityFind
                        ? false
                        : true
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  className="font-michroma w-full md:w-fit"
                  disabled={
                    selectedColor &&
                    selectedSize &&
                    quantityFind?.quantity !== 0 &&
                    quantityFind
                      ? false
                      : true
                  }
                  onClick={() => {
                    const userId = user.id;

                    // Ensure productSC and productSC.id are defined
                    if (!productSC?.id) {
                      return toast({
                        title: "Invalid product.",
                        variant: "destructive",
                      });
                    }

                    const userCartKey = userId ? `atc_${userId}` : `guest`;
                    const encryptedCart = Cookies.get(userCartKey);

                    let existingCart = [];

                    if (encryptedCart) {
                      // Decrypt the cart data
                      const bytes = CryptoJS.AES.decrypt(
                        encryptedCart,
                        String(process.env.NEXT_PUBLIC_COOKIE_KEY)
                      );
                      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                      if (decryptedData) {
                        existingCart = JSON.parse(decryptedData);
                      }
                    }

                    // Check if the item already exists in the cart
                    const findItem = existingCart.find(
                      (item: any) => item.productSCId === productSC?.id
                    );

                    if (findItem) {
                      return toast({
                        title: "This item is already in the cart!",
                        variant: "destructive",
                      });
                    }

                    // Create new cart item
                    const newCartItem = {
                      productSCId: productSC?.id,
                      quantity: quantity,
                    };

                    // Add the new item to the existing cart
                    existingCart.push(newCartItem);

                    // Encrypt the updated cart data
                    const encryptedCartData = CryptoJS.AES.encrypt(
                      JSON.stringify(existingCart),
                      String(process.env.NEXT_PUBLIC_COOKIE_KEY)
                    ).toString();

                    // Save the updated cart data back to cookies
                    Cookies.set(userCartKey, encryptedCartData, {
                      expires: 7,
                      path: "/",
                      secure: true,
                      sameSite: "Strict",
                    });

                    // Dispatch to Redux store (for state management)
                    dispatch(AddItems(newCartItem));

                    // Show success message
                    toast({
                      title: "Item added to cart!",
                      variant: "default",
                    });

                    // Close the modal or do any other action
                    setOpen(false);
                  }}
                >
                  {addToCartLoading ? (
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-8 h-8" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductCardView;
