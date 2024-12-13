"use client";

import { Separator } from "@/components/ui/separator";
import { TotalCalc, TotalQuantity } from "@/lib/general";
import { useAppSelector } from "@/store/hooks";
import {
  CircleDollarSign,
  CircleOff,
  HandCoins,
  Package,
  ShoppingBag,
} from "lucide-react";
import ProductCardInCart from "./productCartInCart";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CartPageClient() {
  const router = useRouter();

  const { items, addToCartLoading } = useAppSelector(
    (state) => state.AddToCart
  );
  const { products } = useAppSelector((state) => state.Product);
  const { productSizeColors } = useAppSelector(
    (state) => state.ProductSizeColor
  );
  const { productColors } = useAppSelector((state) => state.ProductColor);
  return (
    <div className="px-6 lg:px-28 3xl:px-96">
      <div className="mt-4 flex flex-col-reverse justify-between ">
        <div>
          {" "}
          <p className="flex gap-1 items-center text-xl font-roboto font-semibold">
            <ShoppingBag /> Your Cart
          </p>
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
              {TotalCalc(items, productSizeColors, products, productColors) ===
              0
                ? ""
                : TotalCalc(items, productSizeColors, products, productColors)}
            </span>
          </span>
        </div>
        {items.length <= 0 ? (
          ""
        ) : (
          <div className="flex justify-end">
            <Button
              className="rounded-none px-5 py-5 lg:px-10 lg:py-5"
              onClick={() => {
                router.push("/check-out");
              }}
            >
              Check Out <HandCoins />
            </Button>
          </div>
        )}
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col gap-2 mt-3 h-3/4  overflow-y-scroll  scrollbar-none ">
        {items.length === 0 ? (
          <div className="flex h-52 justify-center items-center">
            <p className="flex gap-2 items-center text-gray-600">
              <CircleOff />
              No item inside cart!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {items.map((item) => {
              return (
                <div key={item.productSCId} className="my-3">
                  <ProductCardInCart item={item} loading={addToCartLoading} />
                  <Separator className="my-3" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
