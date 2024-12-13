"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  CircleDollarSign,
  CircleOff,
  HandCoins,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import ProductCardInSheet from "./productCardInSheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { TotalCalc, TotalQuantity } from "@/lib/general";
import { useRouter } from "next/navigation";

export default function CartSheet() {
  const router = useRouter();

  const { items, addToCartLoading } = useAppSelector(
    (state) => state.AddToCart
  );
  const { products } = useAppSelector((state) => state.Product);
  const { productColors } = useAppSelector((state) => state.ProductColor);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer flex flex-col items-center">
          <ShoppingBag className="w-7 h-7 " />
          <span className="text-xs font-semibold">Cart</span>
        </div>
      </SheetTrigger>
      <SheetContent className=" ">
        <SheetTitle className="font-semibold text-2xl w-full flex flex-row items-center gap-2">
          <ShoppingBag className="w-7 h-7" />
          <span> Your Cart</span>
        </SheetTitle>
        <SheetDescription>
          {items.length > 0 && (
            <div className="flex flex-col w-full mt-3">
              <span className="flex flex-row items-center mb-1">
                <Package className="w-4 h-4 mr-1" />
                <span>Total Items : </span>
                <span className="ml-1 text-black font-semibold">
                  {TotalQuantity(items) === 0 ? "" : TotalQuantity(items)}
                </span>
              </span>
              <span className="flex flex-row items-center">
                <CircleDollarSign className="w-4 h-4 mr-1" /> Total Price :
                <span className="ml-1 text-black font-semibold text-lg">
                  {TotalCalc(
                    items,
                    productSizeColors,
                    products,
                    productColors
                  ) === 0
                    ? ""
                    : TotalCalc(
                        items,
                        productSizeColors,
                        products,
                        productColors
                      )}
                </span>
              </span>
            </div>
          )}
        </SheetDescription>
        <div className="flex flex-col gap-2 mt-3 h-3/4 w-full  overflow-y-scroll  scrollbar-none ">
          {items.length === 0 ? (
            <div className="flex h-52 justify-center items-center">
              <p className="flex gap-2 items-center text-gray-600">
                <CircleOff />
                No item inside cart!
              </p>
            </div>
          ) : (
            <>
              {items.map((item) => {
                return (
                  <div key={item.productSCId} className="my-3">
                    <ProductCardInSheet
                      item={item}
                      loading={addToCartLoading}
                    />
                    <Separator className="mb-3" />
                  </div>
                );
              })}
            </>
          )}
        </div>
        {items.length <= 0 ? (
          ""
        ) : (
          <div className="w-full flex flex-col gap-2 absolute bottom-6 left-0 px-5">
            <Button
              variant="outline"
              className="rounded-sm"
              onClick={() => {
                router.push("/cart");
                setOpen(false);
              }}
            >
              View Cart <ShoppingBag />
            </Button>
            <Button
              className="rounded-sm"
              onClick={() => {
                router.push("/check-out");
                setOpen(false);
              }}
            >
              Check Out <HandCoins />
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
